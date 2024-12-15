class Tracker {
    constructor() {
        // Store the center positions of the objects
        this.centerPoints = {};
        // Keep the count of the IDs
        // Each time a new object ID is detected, the count will increase by one
        this.idCount = 0;
    }

    update(objectsRect) {
        // Objects bounding boxes and IDs
        const objectsBbsIds = [];

        // Get center point of new object
        for (const object of objectsRect) {
            const { box: rect } = object;
            const { label } = object;
            const [x, y, w, h] = rect;
            const cx = Math.floor((x + x + w) / 2);
            const cy = Math.floor((y + y + h) / 2);

            // Find out if that object was detected already
            let sameObjectDetected = false;

            for (const id in this.centerPoints) {
                const pt = this.centerPoints[id];
                const dist = Math.hypot(cx - pt[0], cy - pt[1]);

                if (dist < 100) {
                    this.centerPoints[id] = [cx, cy];
                    objectsBbsIds.push([x, y, w, h, parseInt(id), label]);
                    sameObjectDetected = true;
                    break;
                }
            }

            // New object is detected, assign an ID to that object
            if (!sameObjectDetected) {
                this.centerPoints[this.idCount] = [cx, cy];
                objectsBbsIds.push([x, y, w, h, this.idCount, label]);
                this.idCount += 1;
            }
        }

        // Clean the dictionary by center points to remove IDs not used anymore
        const newCenterPoints = {};
        for (const objBbId of objectsBbsIds) {
            const [, , , , objectId] = objBbId;
            const center = this.centerPoints[objectId];
            newCenterPoints[objectId] = center;
        }

        // Update dictionary with IDs not used removed
        this.centerPoints = { ...newCenterPoints };
        return objectsBbsIds;
    }
}
