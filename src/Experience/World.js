import * as THREE from 'three'
import Portal from './Portal.js'

export default class World {
   constructor(_options) {
      this.experience = window.experience
      this.config = this.experience.config
      this.scene = this.experience.scene
      this.resources = this.experience.resources

      this.resources.on('groupEnd', _group => {
         if (_group.name === 'base') {
            this.setPortal()
            this.setFloor()
         }
      })
   }

   setPortal() {
      this.portal = new Portal()
   }

   setFloor() {
      this.floor = {}

      //Geometry
      this.floor.geometry = new THREE.PlaneGeometry(10, 10, 1, 1)
      this.floor.geometry.rotateX(-Math.PI * 0.5)

      //Material
      this.floor.material = new THREE.MeshStandardMaterial({ color: 0xffffff })

      //Mesh
      this.floor.mesh = new THREE.Mesh(this.floor.geometry, this.floor.material)
      this.floor.mesh.position.y = -0.5
      this.scene.add(this.floor.mesh)
   }

   resize() {}

   update() {
      if (this.portal) {
         this.portal.update()
      }
   }

   destroy() {}
}
