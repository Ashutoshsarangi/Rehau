/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @record
 */
export function Sensor() { }
if (false) {
    /** @type {?} */
    Sensor.prototype.title;
    /** @type {?} */
    Sensor.prototype.subTitle;
    /** @type {?} */
    Sensor.prototype.value;
    /** @type {?|undefined} */
    Sensor.prototype.timestamp;
}
/** @enum {string} */
var SupportedDeviceTypes = {
    leckageDetector: 'LeckageDetector',
    floodSensorRehau: 'FloodSensorRehau',
    floodSensorOther: 'FloodSensorOther',
};
export { SupportedDeviceTypes };
/**
 * @record
 */
export function VirtualDevice() { }
if (false) {
    /** @type {?} */
    VirtualDevice.prototype.creationTime;
    /** @type {?} */
    VirtualDevice.prototype.creatorId;
    /** @type {?} */
    VirtualDevice.prototype.customIcons;
    /** @type {?} */
    VirtualDevice.prototype.deviceType;
    /** @type {?} */
    VirtualDevice.prototype.h;
    /** @type {?} */
    VirtualDevice.prototype.hasHistory;
    /** @type {?} */
    VirtualDevice.prototype.id;
    /** @type {?} */
    VirtualDevice.prototype.location;
    /** @type {?} */
    VirtualDevice.prototype.metrics;
    /** @type {?} */
    VirtualDevice.prototype.order;
    /** @type {?} */
    VirtualDevice.prototype.permanently_hidden;
    /** @type {?} */
    VirtualDevice.prototype.probeType;
    /** @type {?} */
    VirtualDevice.prototype.tags;
    /** @type {?} */
    VirtualDevice.prototype.updateTime;
    /** @type {?} */
    VirtualDevice.prototype.visibility;
}
/**
 * @record
 */
export function VirtualDeviceOrder() { }
if (false) {
    /** @type {?} */
    VirtualDeviceOrder.prototype.rooms;
    /** @type {?} */
    VirtualDeviceOrder.prototype.elements;
    /** @type {?} */
    VirtualDeviceOrder.prototype.ashboard;
    /** @type {?} */
    VirtualDeviceOrder.prototype.room;
}
var DeviceMetric = /** @class */ (function () {
    function DeviceMetric() {
    }
    return DeviceMetric;
}());
export { DeviceMetric };
if (false) {
    /** @type {?} */
    DeviceMetric.prototype.icon;
    /** @type {?} */
    DeviceMetric.prototype.title;
    /** @type {?} */
    DeviceMetric.prototype.isFailed;
    /** @type {?} */
    DeviceMetric.prototype.level;
    /** @type {?} */
    DeviceMetric.prototype.scaleTitle;
}
var DeviceOrder = /** @class */ (function () {
    function DeviceOrder() {
    }
    return DeviceOrder;
}());
export { DeviceOrder };
if (false) {
    /** @type {?} */
    DeviceOrder.prototype.rooms;
    /** @type {?} */
    DeviceOrder.prototype.elements;
    /** @type {?} */
    DeviceOrder.prototype.ashboard;
    /** @type {?} */
    DeviceOrder.prototype.room;
}
var DeviceData = /** @class */ (function () {
    function DeviceData() {
        this.customIcons = {};
        this.tags = [];
    }
    return DeviceData;
}());
export { DeviceData };
if (false) {
    /** @type {?} */
    DeviceData.prototype.creationTime;
    /** @type {?} */
    DeviceData.prototype.creatorId;
    /** @type {?} */
    DeviceData.prototype.customIcons;
    /** @type {?} */
    DeviceData.prototype.deviceType;
    /** @type {?} */
    DeviceData.prototype.h;
    /** @type {?} */
    DeviceData.prototype.hasHistory;
    /** @type {?} */
    DeviceData.prototype.id;
    /** @type {?} */
    DeviceData.prototype.location;
    /** @type {?} */
    DeviceData.prototype.metrics;
    /** @type {?} */
    DeviceData.prototype.order;
    /** @type {?} */
    DeviceData.prototype.permanently_hidden;
    /** @type {?} */
    DeviceData.prototype.probeType;
    /** @type {?} */
    DeviceData.prototype.tags;
    /** @type {?} */
    DeviceData.prototype.updateTime;
    /** @type {?} */
    DeviceData.prototype.visibility;
}
/**
 * @record
 */
export function VirtualDeviceMetrics() { }
if (false) {
    /** @type {?} */
    VirtualDeviceMetrics.prototype.icon;
    /** @type {?} */
    VirtualDeviceMetrics.prototype.title;
    /** @type {?} */
    VirtualDeviceMetrics.prototype.level;
    /** @type {?} */
    VirtualDeviceMetrics.prototype.lastLevel;
    /** @type {?} */
    VirtualDeviceMetrics.prototype.modificationTime;
    /** @type {?} */
    VirtualDeviceMetrics.prototype.scaleTitle;
    /** @type {?} */
    VirtualDeviceMetrics.prototype.isFailed;
}
/**
 * @record
 */
export function DeviceMap() { }
if (false) {
    /** @type {?} */
    DeviceMap.prototype.updateTime;
    /** @type {?} */
    DeviceMap.prototype.devices;
}
var SafeGuardDevice = /** @class */ (function () {
    function SafeGuardDevice() {
        this.sensorDevices = [];
    }
    /**
     * @return {?}
     */
    SafeGuardDevice.prototype.getAllConfigParams = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, 1];
            });
        });
    };
    return SafeGuardDevice;
}());
export { SafeGuardDevice };
if (false) {
    /** @type {?} */
    SafeGuardDevice.prototype.mainDevice;
    /** @type {?} */
    SafeGuardDevice.prototype.sensorDevices;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiekF1dG9tYXRpb24ubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9yZWhhdS1mdW5jdGlvbmFsLWNvcmUvIiwic291cmNlcyI6WyJsaWIvbW9kZWxzL3pBdXRvbWF0aW9uLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0EsNEJBS0M7OztJQUpDLHVCQUFjOztJQUNkLDBCQUFpQjs7SUFDakIsdUJBQWM7O0lBQ2QsMkJBQW1COzs7O0lBSW5CLGlCQUFrQixpQkFBaUI7SUFDbkMsa0JBQW1CLGtCQUFrQjtJQUNyQyxrQkFBbUIsa0JBQWtCOzs7Ozs7QUFHdkMsbUNBZ0JDOzs7SUFmQyxxQ0FBcUI7O0lBQ3JCLGtDQUFrQjs7SUFDbEIsb0NBQWlCOztJQUNqQixtQ0FBbUI7O0lBQ25CLDBCQUFVOztJQUNWLG1DQUFvQjs7SUFDcEIsMkJBQVc7O0lBQ1gsaUNBQWlCOztJQUNqQixnQ0FBOEI7O0lBQzlCLDhCQUEwQjs7SUFDMUIsMkNBQTBCOztJQUMxQixrQ0FBa0I7O0lBQ2xCLDZCQUFlOztJQUNmLG1DQUFtQjs7SUFDbkIsbUNBQW9COzs7OztBQUV0Qix3Q0FLQzs7O0lBSkMsbUNBQWM7O0lBQ2Qsc0NBQWlCOztJQUNqQixzQ0FBaUI7O0lBQ2pCLGtDQUFhOztBQUdmO0lBQUE7SUFNQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7OztJQUxDLDRCQUFhOztJQUNiLDZCQUFjOztJQUNkLGdDQUFrQjs7SUFDbEIsNkJBQVc7O0lBQ1gsa0NBQWdCOztBQUdsQjtJQUFBO0lBS0EsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7Ozs7SUFKQyw0QkFBYzs7SUFDZCwrQkFBaUI7O0lBQ2pCLCtCQUFpQjs7SUFDakIsMkJBQWE7O0FBR2Y7SUFBQTtRQUdFLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBV2pCLFNBQUksR0FBYSxFQUFFLENBQUM7SUFHdEIsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQzs7OztJQWhCQyxrQ0FBcUI7O0lBQ3JCLCtCQUFrQjs7SUFDbEIsaUNBQWlCOztJQUNqQixnQ0FBbUI7O0lBQ25CLHVCQUFVOztJQUNWLGdDQUFvQjs7SUFDcEIsd0JBQVc7O0lBQ1gsOEJBQWlCOztJQUNqQiw2QkFBc0I7O0lBQ3RCLDJCQUFtQjs7SUFFbkIsd0NBQTBCOztJQUMxQiwrQkFBa0I7O0lBQ2xCLDBCQUFvQjs7SUFDcEIsZ0NBQW1COztJQUNuQixnQ0FBb0I7Ozs7O0FBR3RCLDBDQVFDOzs7SUFQQyxvQ0FBYTs7SUFDYixxQ0FBYzs7SUFDZCxxQ0FBYzs7SUFDZCx5Q0FBa0I7O0lBQ2xCLGdEQUF5Qjs7SUFDekIsMENBQWdCOztJQUNoQix3Q0FBa0I7Ozs7O0FBR3BCLCtCQUdDOzs7SUFGQywrQkFBbUI7O0lBQ25CLDRCQUF5Qzs7QUFHM0M7SUFBQTtRQUVFLGtCQUFhLEdBQWlCLEVBQUUsQ0FBQztJQUluQyxDQUFDOzs7O0lBSE8sNENBQWtCOzs7SUFBeEI7OztnQkFDRSxzQkFBTyxDQUFDLEVBQUM7OztLQUNWO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQzs7OztJQUxDLHFDQUF1Qjs7SUFDdkIsd0NBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgaW50ZXJmYWNlIFNlbnNvciB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN1YlRpdGxlOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRpbWVzdGFtcD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gU3VwcG9ydGVkRGV2aWNlVHlwZXMge1xuICBsZWNrYWdlRGV0ZWN0b3IgPSAnTGVja2FnZURldGVjdG9yJyxcbiAgZmxvb2RTZW5zb3JSZWhhdSA9ICdGbG9vZFNlbnNvclJlaGF1JyxcbiAgZmxvb2RTZW5zb3JPdGhlciA9ICdGbG9vZFNlbnNvck90aGVyJ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZpcnR1YWxEZXZpY2Uge1xuICBjcmVhdGlvblRpbWU6IG51bWJlcjtcbiAgY3JlYXRvcklkOiBudW1iZXI7XG4gIGN1c3RvbUljb25zOiBhbnk7XG4gIGRldmljZVR5cGU6IHN0cmluZztcbiAgaDogbnVtYmVyO1xuICBoYXNIaXN0b3J5OiBib29sZWFuO1xuICBpZDogc3RyaW5nO1xuICBsb2NhdGlvbjogbnVtYmVyO1xuICBtZXRyaWNzOiBWaXJ0dWFsRGV2aWNlTWV0cmljcztcbiAgb3JkZXI6IFZpcnR1YWxEZXZpY2VPcmRlcjtcbiAgcGVybWFuZW50bHlfaGlkZGVuOiBmYWxzZTtcbiAgcHJvYmVUeXBlOiBzdHJpbmc7XG4gIHRhZ3M6IHN0cmluZ1tdO1xuICB1cGRhdGVUaW1lOiBudW1iZXI7XG4gIHZpc2liaWxpdHk6IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIFZpcnR1YWxEZXZpY2VPcmRlciB7XG4gIHJvb21zOiBudW1iZXI7XG4gIGVsZW1lbnRzOiBudW1iZXI7XG4gIGFzaGJvYXJkOiBudW1iZXI7XG4gIHJvb206IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIERldmljZU1ldHJpYyB7XG4gIGljb246IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbiAgaXNGYWlsZWQ6IGJvb2xlYW47XG4gIGxldmVsOiBhbnk7XG4gIHNjYWxlVGl0bGU6IGFueTtcbn1cblxuZXhwb3J0IGNsYXNzIERldmljZU9yZGVyIHtcbiAgcm9vbXM6IG51bWJlcjtcbiAgZWxlbWVudHM6IG51bWJlcjtcbiAgYXNoYm9hcmQ6IG51bWJlcjtcbiAgcm9vbTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRGV2aWNlRGF0YSB7XG4gIGNyZWF0aW9uVGltZTogbnVtYmVyO1xuICBjcmVhdG9ySWQ6IG51bWJlcjtcbiAgY3VzdG9tSWNvbnMgPSB7fTtcbiAgZGV2aWNlVHlwZTogc3RyaW5nO1xuICBoOiBudW1iZXI7XG4gIGhhc0hpc3Rvcnk6IGJvb2xlYW47XG4gIGlkOiBzdHJpbmc7XG4gIGxvY2F0aW9uOiBudW1iZXI7XG4gIG1ldHJpY3M6IERldmljZU1ldHJpYztcbiAgb3JkZXI6IERldmljZU9yZGVyO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwZXJtYW5lbnRseV9oaWRkZW46IGZhbHNlO1xuICBwcm9iZVR5cGU6IHN0cmluZztcbiAgdGFnczogc3RyaW5nW10gPSBbXTtcbiAgdXBkYXRlVGltZTogbnVtYmVyO1xuICB2aXNpYmlsaXR5OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZpcnR1YWxEZXZpY2VNZXRyaWNzIHtcbiAgaWNvbjogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBsZXZlbDogc3RyaW5nO1xuICBsYXN0TGV2ZWw6IHN0cmluZztcbiAgbW9kaWZpY2F0aW9uVGltZTogc3RyaW5nO1xuICBzY2FsZVRpdGxlOiBhbnk7XG4gIGlzRmFpbGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERldmljZU1hcCB7XG4gIHVwZGF0ZVRpbWU6IHN0cmluZztcbiAgZGV2aWNlczogeyBbaWQ6IHN0cmluZ106IFZpcnR1YWxEZXZpY2UgfTtcbn1cblxuZXhwb3J0IGNsYXNzIFNhZmVHdWFyZERldmljZSB7XG4gIG1haW5EZXZpY2U6IERldmljZURhdGE7XG4gIHNlbnNvckRldmljZXM6IERldmljZURhdGFbXSA9IFtdO1xuICBhc3luYyBnZXRBbGxDb25maWdQYXJhbXMoKSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbn1cbiJdfQ==