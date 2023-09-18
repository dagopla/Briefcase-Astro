import { log } from 'astro/dist/core/logger/core';
import * as THREE from 'three';

export class Sphere {
  private canvas:HTMLCanvasElement= document.getElementById("canvas") as HTMLCanvasElement;
  public rotationSpeedX: number = 0.001;
  public rotationSpeedY: number = 0.005;
  public size: number = 200;
  public texture: string = "/mylanguages.webp";

  //stage properties
  public cameraZ: number = 500;
  public fieldOfView: number = 70;
  public nearClippingPane: number = 1;
  public farClippingPane: number = 1000;

  private camera!: THREE.PerspectiveCamera;

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.SphereGeometry(this.size, 32, 32);
  private material = new THREE.MeshBasicMaterial({
    transparent: true,
    map: this.loader.load(this.texture),
    side: THREE.DoubleSide,
    opacity: 1,
    // Ajusta la opacidad según tus necesidades (0 = totalmente transparente, 1 = totalmente opaco)
  });

  private sphere: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  start(): void {
    console.log("App is running");
    this.crateScene();
    this.startRenderingLoop();

  }

  private crateScene(): void {
    this.scene = new THREE.Scene();
    this.scene.add(this.sphere);
    //luz

    // Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    this.camera.position.z = 400;
  }
  private getAspectRatio(): number {
    return this.canvas!.clientWidth / this.canvas!.clientHeight;
  }
  private animateSphere() {
    this.sphere.rotation.x += this.rotationSpeedX;
    this.sphere.rotation.y += this.rotationSpeedY;
  }
  private startRenderingLoop(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: Sphere = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateSphere();
      component.renderer.render(component.scene, component.camera);
    })();
  }
  private backgroundTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 700;

    const context = canvas.getContext("2d");
    const gradient = context!.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#ffffff");
    context!.fillStyle = gradient;
    context!.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    this.scene.background = texture;
  }
}

Sphere.prototype.start();