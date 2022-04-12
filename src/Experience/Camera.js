import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
   constructor(_options) {
      // Options
      this.experience = window.experience
      this.config = this.experience.config
      this.debug = this.experience.debug
      this.time = this.experience.time
      this.sizes = this.experience.sizes
      this.targetElement = this.experience.targetElement
      this.scene = this.experience.scene

      // Set up
      this.mode = 'default' // defaultCamera \ debugCamera

      this.setInstance()
      this.setModes()
   }

   setInstance() {
      // Set up
      this.instance = new THREE.PerspectiveCamera(
         45,
         this.config.width / this.config.height,
         0.1,
         150
      )
      this.instance.rotation.reorder('YXZ')

      this.scene.add(this.instance)
   }

   setModes() {
      this.modes = {}

      // Default
      this.modes.default = {}
      this.modes.default.instance = this.instance.clone()
      this.modes.default.instance.rotation.reorder('YXZ')
      this.modes.default.instance.position.set(0.25, 0.5, 1.5)

      this.modes.default.orbitControls = new OrbitControls(
         this.modes.default.instance,
         this.targetElement
      )
      this.modes.default.orbitControls.enabled = true
      this.modes.default.orbitControls.enableRotate = false
      this.modes.default.orbitControls.enableDamping = true
      this.modes.default.orbitControls.update()

      // this.modes.default.orbitControls.enabled = this.modes.default.active
      // this.modes.default.orbitControls.screenSpacePanning = true
      // this.modes.default.orbitControls.enableKeys = false
      // this.modes.default.orbitControls.zoomSpeed = 0.25
      // this.modes.default.orbitControls.enableDamping = true
      // this.modes.default.orbitControls.update()

      // Debug
      this.modes.debug = {}
      this.modes.debug.instance = this.instance.clone()
      this.modes.debug.instance.rotation.reorder('YXZ')
      this.modes.debug.instance.position.set(0.25, 0.5, 1.5)

      this.modes.debug.orbitControls = new OrbitControls(
         this.modes.debug.instance,
         this.targetElement
      )
      this.modes.debug.orbitControls.enabled = this.modes.debug.active
      this.modes.debug.orbitControls.screenSpacePanning = true
      this.modes.debug.orbitControls.enableKeys = false
      this.modes.debug.orbitControls.zoomSpeed = 0.25
      this.modes.debug.orbitControls.enableDamping = true
      this.modes.debug.orbitControls.update()
   }

   resize() {
      this.instance.aspect = this.config.width / this.config.height
      this.instance.updateProjectionMatrix()

      this.modes.default.instance.aspect =
         this.config.width / this.config.height
      this.modes.default.instance.updateProjectionMatrix()

      this.modes.debug.instance.aspect = this.config.width / this.config.height
      this.modes.debug.instance.updateProjectionMatrix()
   }

   update() {
      // Update debug orbit controls
      this.modes.debug.orbitControls.update()
      this.modes.default.orbitControls.update()

      // Apply coordinates
      this.instance.position.copy(this.modes[this.mode].instance.position)
      this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
      this.instance.updateMatrixWorld() // To be used in projection
   }

   destroy() {
      this.modes.debug.orbitControls.destroy()
   }
}
