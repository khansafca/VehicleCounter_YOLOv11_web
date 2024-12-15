'use client'

import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Tracker } from '@/lib/tracking';
import { triggerLine } from '@/lib/utils';
import Feed from "@/components/Feed";
import VehicleGraphs from '@/components/VehicleGraphs';

const classNames = {
    0: "bus",
    1: "car",
    2: "motorbike",
    3: "truck",
};

const TARGET_WIDTH = 640;
const TARGET_HEIGHT = 640;
const linePoint1 = [140, 220];
const linePoint2 = [410, 400];
const offset = 12;

const YOLODetection = () => {
    const tracker = new Tracker();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState();
    const [vehicleStats, setVehicleStats] = useState({
        car: 0,
        motorbike: 0,
        truck: 0,
        bus: 0,
    });

    const updateVehicleStats = (vehicleType) => {
        setVehicleStats(prevStats => ({
            ...prevStats,
            [vehicleType]: prevStats[vehicleType] + 1,
        }));
    };

    const detectedId = [];


    useEffect(() => {
        if (model) return;
        tf.ready().then(async () => {

            const yolov8 = await tf.loadGraphModel('/model/yolov11-200epochs_web_model/model.json',); // load model

            // warming up model
            const dummyInput = tf.ones(yolov8.inputs[0].shape);
            const warmupResults = yolov8.execute(dummyInput);

            setModel(yolov8); // set model & input shape

            tf.dispose([warmupResults, dummyInput]); // cleanup memory

            return () => {
                yolov8.dispose();
            }
        });
    }, [model]);

    const runModel = async (tensor) => {
        return model.predict(tensor);
    };

    const processWebcamFrame = async () => {
        const video = videoRef.current;
        const tensor = await webcamToTensor(video);
        const startTime = performance.now();
        const predictions = await runModel(tensor);
        const endTime = performance.now();
        const inferenceTime = endTime - startTime;
        console.log(`Inference Time: ${inferenceTime.toFixed(2)} ms`);
        const detections = processPredictions(predictions, classNames);
        const trackedBbox = tracker.update(detections);
        await drawBoundingBoxes(video, trackedBbox);
    };

    const webcamToTensor = async (videoElement) => {
        const canvas = document.createElement('canvas');
        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        ctx.drawImage(videoElement, 0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        const imageData = ctx.getImageData(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
        const tensor = tf.browser.fromPixels(imageData);

        return tf.cast(tensor, 'float32').div(tf.scalar(255)).expandDims(0);
    };

    const processPredictions = (predictions, classNames) => {
        return tf.tidy(() => {
            const transRes = predictions.transpose([0, 2, 1]);
            const boxes = calculateBoundingBoxes(transRes);
            const [scores, labels] = calculateScoresAndLabels(transRes, classNames);

            const indices = tf.image.nonMaxSuppression(boxes, scores, predictions.shape[2], 0.45, 0.8).arraySync();
            return extractSelectedPredictions(indices, boxes, labels, classNames);
        });
    };

    const calculateBoundingBoxes = (transRes) => {
        const [xCenter, yCenter, width, height] = [
            transRes.slice([0, 0, 0], [-1, -1, 1]),
            transRes.slice([0, 0, 1], [-1, -1, 1]),
            transRes.slice([0, 0, 2], [-1, -1, 1]),
            transRes.slice([0, 0, 3], [-1, -1, 1])
        ];

        const topLeftX = tf.sub(xCenter, tf.div(width, 2));
        const topLeftY = tf.sub(yCenter, tf.div(height, 2));
        return tf.concat([topLeftX, topLeftY, width, height], 2).squeeze();
    };

    const calculateScoresAndLabels = (transRes, classNames) => {
        const rawScores = transRes.slice([0, 0, 4], [-1, -1, Object.keys(classNames).length]).squeeze(0);
        return [rawScores.max(1), rawScores.argMax(1)];
    };

    const extractSelectedPredictions = (indices, boxes, labels, classNames) => {
        return indices.map(i => {
            const box = boxes.slice([i, 0], [1, -1]).squeeze().arraySync();
            const label = labels.slice([i], [1]).arraySync()[0];
            return { box, label: classNames[label] };
        });
    };

    const drawBoundingBoxes = async (imageElement, detections) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const resizeScale = Math.min(TARGET_WIDTH / canvas.width, TARGET_HEIGHT / canvas.height);
        const dx = (TARGET_WIDTH - canvas.width * resizeScale) / 2;
        const dy = (TARGET_HEIGHT - canvas.height * resizeScale) / 2;

        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(linePoint1[0], linePoint1[1]);
        ctx.lineTo(linePoint2[0], linePoint2[1]);
        ctx.stroke();

        detections.forEach(([topLeftX, topLeftY, width, height, id, label]) => {
            if (triggerLine([topLeftX, topLeftY, width, height], linePoint1, linePoint2, offset)) {
                if (!detectedId.includes(id)) {
                    detectedId.push(id);
                    updateVehicleStats(label);
                }
            }
            topLeftX = topLeftX / resizeScale - dx / resizeScale;
            topLeftY = topLeftY / resizeScale - dy / resizeScale;
            width /= resizeScale;
            height /= resizeScale;

            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.strokeRect(topLeftX, topLeftY, width, height);
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            ctx.fillText(`#${id} ${label}`, topLeftX, topLeftY - 7);
        });
    };

    const setupWebcam = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            const video = videoRef.current;
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
        } else {
            console.error('getUserMedia is not supported');
        }
    };

    const handleRunInference = async () => {
        await setupWebcam();
        setInterval(processWebcamFrame, 100);
    };

    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto mt-32">
                <div className="grid lg:grid-cols-2 gap-52 grid-rows-2">
                    <Feed videoRef={videoRef} canvasRef={canvasRef} handleRunInference={handleRunInference} />
                    <VehicleGraphs vehicleStats={vehicleStats} />
                </div>
            </div>
        </div>
    );
};

export default YOLODetection;