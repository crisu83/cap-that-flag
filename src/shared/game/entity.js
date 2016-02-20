import { find, forEach } from 'lodash';

class Entity {
  /**
   *
   * @param {Object} props
   */
  constructor(props) {
    this._props = props;
    this._components = [];
  }

  /**
   *
   * @param {Object} props
   * @param {function} dispatch
   */
  update(props, dispatch) {
    this._components.sort((a, b) => a.priority - b.priority);

    forEach(this._components, component => {
      component.update(props, dispatch);
    });
  }

  /**
   *
   */
  destroy() {
    forEach(this._components, component => {
      component.destroy();
    });
  }

  /**
   *
   * @param {Component} component
   */
  addComponent(component) {
    component.entity = this;
    this._components.push(component);
  }

  /**
   *
   * @param {string} key
   * @returns {Component}
   */
  getComponent(key) {
    return find(this._components, component => component.key === key);
  }

  /**
   *
   * @param {string} key
   * @param {*} value
   */
  setProp(key, value) {
    this._props[key] = value;
  }

  /**
   *
   * @param {string} key
   * @returns {*}
   */
  getProp(key) {
    return this._props[key];
  }

  /**
   *
   * @returns {string}
   */
  get id() {
    return this.getProp('id');
  }

  /**
   *
   * @param {Array<Component>} components
   */
  set components(components) {
    this._components = components;
  }
}

export default Entity;