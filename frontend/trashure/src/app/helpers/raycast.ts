/**
 * @author sihang / http://github.com/qiusihang
 * Used with permission
 */

export class Raycast {

  heading;
  pitch;
  screen_x;
  screen_y;
  fov;
  aspect;

  constructor(heading, pitch, norm_screen_x, norm_screen_y, fov, aspect) {
    this.heading = heading;
    this.pitch = pitch;
    this.screen_x = norm_screen_x;
    this.screen_y = norm_screen_y;
    this.fov = fov;
    this.aspect = aspect;
  }

  get_raycast()
  {
    return {pitch: this.pitch + 0.5 * this.screen_y * this.fov / this.aspect,
      heading: this.heading + 0.5 * this.screen_x * this.fov}
  }

  get_distance(observer_height)
  {
    var theta = this.get_raycast().pitch;
    console.log('theta', theta);
    return Math.abs(observer_height/Math.tan(theta/180.0*Math.PI));
  }

  get_latlng(current_lat, current_lng)
  {
    var heading = ((360 - this.get_raycast().heading) + 90)%360;
    var distance = this.get_distance(3);
    console.log('distance', distance);
    if (distance == null || distance > 20) return null;
    var x = distance * Math.cos(heading/180.0*Math.PI);
    var y = distance * Math.sin(heading/180.0*Math.PI);
    return {lat: current_lat + y/111300.0,
      lng: current_lng + x/111300.0/Math.cos(current_lat/180.0*Math.PI)};
  }

}
