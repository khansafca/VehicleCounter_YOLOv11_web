import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { GraphData, VehicleStats } from "@/components/VehicleGraphs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function xywhToxyxy(xywh: number[]): number[] {
  const x1 = xywh[0] - xywh[2] / 2;
  const y1 = xywh[1] - xywh[3] / 2;
  const x2 = xywh[0] + xywh[2] / 2;
  const y2 = xywh[1] + xywh[3] / 2;
  return [x1, y1, x2, y2];
}

export function triggerLine(xywh: number[], linePoint1: number[], linePoint2: number[], offset: number) {
  const [, y1, , y2] = xywhToxyxy(xywh);

  const bboxYCenter = Math.floor((y1 + y2) / 2)
  const lineYCenter = Math.floor((linePoint1[1] + linePoint2[1]) / 2)
  return lineYCenter < (bboxYCenter + offset) && lineYCenter > (bboxYCenter - offset);
}

export function updateCounter(cls: string, counter: VehicleStats) {
  return { ...counter, [cls]: counter[cls as keyof VehicleStats] + 1 }
}

export function updateGraphData(counter: VehicleStats, graphUpdate: GraphData) {
  const timestamp = new Date().toLocaleTimeString();
  graphUpdate.timestamps.push(timestamp);
  graphUpdate.car.push(counter.car);
  graphUpdate.truck.push(counter.truck);
  graphUpdate.motorbike.push(counter.motorbike);
  graphUpdate.bus.push(counter.bus);

  if (graphUpdate.timestamps.length > 12) {
    for (const key in graphUpdate) {
      (graphUpdate[key as keyof GraphData] as number[]).shift();
    }
  }
}

