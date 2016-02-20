import React, { Component } from 'react';
import { connect } from 'react-redux';
import { beginConnection, endConnection, startLoading, stopLoading } from '../actions/client';
import { setState } from '../actions/game';
import { createGame } from '../factories/game';
import Status from './status';

const LOAD_DELAY = 750;

function mapStateToProps(state) {
  return {
    isConnected: state.client.get('isConnected'),
    isLoading: state.client.get('isLoading'),
    gameState: state.game.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onConnect() {
      dispatch(beginConnection());
    },
    onDisconnect() {
      dispatch(endConnection());
    },
    onStartLoading() {
      dispatch(startLoading());
    },
    onStopLoading() {
      dispatch(stopLoading());
    },
    onSetState(state) {
      dispatch(setState(state));
    }
  };
}

export class Game extends Component {
  constructor() {
    super();

    this._game = null;

    this.handleConnect = this.handleConnect.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  componentDidMount() {
    this.props.onStartLoading();

    this.props.socket.on('connect', this.handleConnect);
    this.props.socket.on('ready', this.handleReady);
    this.props.socket.on('disconnect', this.handleDisconnect);
  }

  handleConnect() {
    console.log('CONNECTED');
  }

  handleReady(clientId, gameData, gameState, playerProps) {
    this.props.onConnect();

    console.log('READY (client_id: %s)', clientId, gameData, gameState, playerProps);

    // Set the initial game state when the client is ready.
    this.props.onSetState(gameState);

    setTimeout(() => {
      this._game = createGame(this.props.store, this.props.socket, gameData, playerProps);

      this.props.onStopLoading();
    }, LOAD_DELAY);
  }

  handleDisconnect() {
    console.log('DISCONNECTED');

    if (this._game) {
      this._game.destroy();
    }
  }

  render() {
    const { isConnected, isLoading } = this.props;

    return (
      <div className="game">
        {isLoading ? <Status isConnected={isConnected}/> : null}
        <div id="phaser" style={{ display: isConnected && !isLoading ? 'block' : 'none' }}></div>
      </div>
    );
  }
}

export const GameContainer = connect(mapStateToProps, mapDispatchToProps)(Game);