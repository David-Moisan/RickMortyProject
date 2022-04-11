export default class Environment {
   constructor() {
      this.experience = window.experience
      this.resources = this.experience.resources
      this.scene = this.experience.scene

      this.scene.add(this.resources.items.envModels.scene)
   }
}
