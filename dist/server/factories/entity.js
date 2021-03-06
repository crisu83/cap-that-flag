'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.createEntity=createEntity;var _lodash=require('lodash');var _vendor=require('../helpers/vendor');var _entity=require('../../shared/game/entity');var _entity2=_interopRequireDefault(_entity);var _health=require('../game/components/health');var _health2=_interopRequireDefault(_health);var _points=require('../game/components/points');var _points2=_interopRequireDefault(_points);var _constants=require('../constants');var _entity3=require('../actions/entity');var _game=require('../helpers/game');var _constants2=require('../../shared/constants');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}} /**
 *
 * @param {Session} session
 * @param {Object} props
 * @returns {Entity}
 */function createPlayer(session,props){var entity=new _entity2.default(props);var onHealthComponentUpdate=function onHealthComponentUpdate(props,dispatch){if(!props.isDead&&props.currentHealth<=0){(function(){dispatch((0,_entity3.killEntity)(props.id,props.lastAttackerId));var team=session.getEntity(props.team);var _calculateTeamSpawnPo=(0,_game.calculateTeamSpawnPosition)(team.props,props);var x=_calculateTeamSpawnPo.x;var y=_calculateTeamSpawnPo.y; // Automatically revive the entity in a while
setTimeout(function(){dispatch((0,_entity3.beginRevive)(props.id,x,y));setTimeout(function(){dispatch((0,_entity3.endRevive)(props.id))},500)},props.reviveDuration)})()}};entity.addComponent(new _health2.default(onHealthComponentUpdate));return entity} /**
 *
 * @param {Session} session
 * @param {Object} props
 * @returns {Entity}
 */ /*eslint no-shadow: 0*/ /*eslint no-unused-vars: 0*/function createFlag(session,props){var entity=new _entity2.default(props);return entity} /**
 *
 * @param {Session} session
 * @param {Object} props
 * @returns {Entity}
 */function createTeam(session,props){var entity=new _entity2.default(props);var onPointsComponentUpdate=function onPointsComponentUpdate(updateProps,dispatch){var _this=this;if(updateProps.players&&updateProps.numFlags&&this.shouldGivePoints()){(function(){var points=updateProps.numFlags*_constants.POINTS_PER_FLAG;(0,_lodash.forEach)(updateProps.players,function(playerId){dispatch((0,_entity3.givePoints)(playerId,points))});_this.pointsGiven()})()}};entity.addComponent(new _points2.default(onPointsComponentUpdate));return entity} /**
 *
 * @param {Session} session
 * @param {Object} props
 * @returns {Entity}
 */function createEntity(session,props){switch(props.type){case _constants2.EntityTypes.PLAYER:return createPlayer(session,props);case _constants2.EntityTypes.FLAG:return createFlag(session,props);case _constants2.EntityTypes.TEAM:return createTeam(session,props);default:_vendor.logger.warn('trying to create entity of unknown type '+props.type+'.');return null;}}
//# sourceMappingURL=entity.js.map