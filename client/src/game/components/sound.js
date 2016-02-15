import { forEach } from 'lodash';
import Component, { PHASE_LOGIC } from '../component';

class Sound extends Component {
  /**
   *
   * @param {Entity} owner
   * @param {Array<Phaser.Sound>} sounds
   * @param {function} onUpdate
   */
  constructor(owner, sounds, onUpdate) {
    super('sound', PHASE_LOGIC, owner, onUpdate);

    this._sounds = sounds;
  }

  /**
   *
   */
  destroy() {
    forEach(this._sounds, sound => {
      sound.destroy();
    });
  }

  /**
   *
   * @param key
   * @returns {Phaser.Sound}
   */
  getSound(key) {
    return this._sounds[key];
  }
}

export default Sound;