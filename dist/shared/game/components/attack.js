'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value' in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _lodash=require('lodash');var _component=require('../component');var _component2=_interopRequireDefault(_component);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var DEFAULT_COOLDOWN=500;var Attack=function(_Component){_inherits(Attack,_Component);function Attack(onUpdate){_classCallCheck(this,Attack);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(Attack).call(this,'attack',0,onUpdate));_this._lastAttackAt=null;return _this}_createClass(Attack,[{key:'canAttack',value:function canAttack(){var cooldown=this.getProp('attackCooldown')||DEFAULT_COOLDOWN;return !this._lastAttackAt||(0,_lodash.now)()-this._lastAttackAt>cooldown}},{key:'performAttack',value:function performAttack(){this._lastAttackAt=(0,_lodash.now)()}}]);return Attack}(_component2.default);exports.default=Attack;
//# sourceMappingURL=attack.js.map