import { RouteReuseStrategy } from '@angular/router/';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
export class CacheRouteReuseStrategy implements RouteReuseStrategy {
storedRouteHandles = new Map<string, DetachedRouteHandle>();
allowRetriveCache: any = {
    landing : true,
};
allowRoute: boolean = false;

shouldReuseRoute(before: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
const dataObject: any = !!curr.data.reuseStrategy && curr.data.reuseStrategy;
let shouldReUse: any;
if (dataObject) {
    this.allowRetriveCache[this.getPath(curr)] = true;
    shouldReUse = dataObject.from.indexOf(this.getPath(before));
    this.allowRoute = shouldReUse > -1 ? true : false;
}
return before.routeConfig === curr.routeConfig;
}
retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
  return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
}
shouldAttach(route: ActivatedRouteSnapshot): boolean {
  if (this.allowRoute) {
    return this.storedRouteHandles.has(this.getPath(route));
  }
  return false;
}
shouldDetach(route: ActivatedRouteSnapshot): boolean {
  const path = this.getPath(route);
  if (this.allowRetriveCache.hasOwnProperty(path) && route.routeConfig.loadChildren) {
    return true;
  }
  return false;
}
store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
  this.storedRouteHandles.set(this.getPath(route), detachedTree);
}
private getPath(route: ActivatedRouteSnapshot): string {
  if (route.routeConfig !== null && route.routeConfig.path !== null) {
    return route.routeConfig.path;
  }
  return '';
}
}
