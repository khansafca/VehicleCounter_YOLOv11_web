const xywhToxyxy = (xywh) => {
    const x1 = xywh[0] - xywh[2] / 2
    const y1 = xywh[1] - xywh[3] / 2
    const x2 = xywh[0] + xywh[2] / 2
    const y2 = xywh[1] + xywh[3] / 2
    return [parseInt(x1), parseInt(y1), parseInt(x2), parseInt(y2)]
};

function triggerLine(x, y, w, h) {
    const [x1, y1, x2, y2] = xywhToxyxy(x, y, w, h);
    console.log(x1, y1, x2, y2);

    const bboxYCenter = Math.floor((y1 + y2) / 2)
    const lineYCenter = Math.floor((linePoint1[1] + linePoint2[1]) / 2)
    return lineYCenter < (bboxYCenter + offset) && lineYCenter > (bboxYCenter - offset);
}

function updateCounter(cls, counter) {
    if (cls in counter) {
        counter[cls]++;
    }
}

