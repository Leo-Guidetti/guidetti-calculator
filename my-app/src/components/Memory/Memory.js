import React, {Component} from 'react';
import "./Memory.css";

class Memory extends Component {
  render() {
      return(<div className="memory-wrapper">
                {this.props.item}
                <div className={'memory-button'} onClick={() => this.props.aoClicar('MC'+String(this.props.index))}>
                    MC
                </div>
                <div className={'memory-button'} onClick={() => this.props.aoClicar('MR'+String(this.props.index))}>
                    MR
                </div>
            </div>
            );
        }
    }

export default Memory;