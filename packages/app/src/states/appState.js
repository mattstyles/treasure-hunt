
/**
 * AppState abstract
 */
export class AppState {
  onCreate (app) {
    this.app = app
  }

  onDestroy () {
    // noop
  }

  render (state) {
    // noop
  }

  update (state) {
    // noop
  }
}
