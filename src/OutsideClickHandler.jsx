import React from 'react';
import PropTypes from 'prop-types';

import { addEventListener } from 'consolidated-events';

import contains from 'document.contains';

const DISPLAY = {
  BLOCK: 'block',
  FLEX: 'flex',
  INLINE: 'inline',
  INLINE_BLOCK: 'inline-block',
  CONTENTS: 'contents',
};
const pseudoObjectValues = (obj) => {
  const objValues = [];
  for (const val in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, val)) {
      objValues.push(obj[val]);
    }
  }
  return objValues;
};
const DISPLAY_VALUES = pseudoObjectValues(DISPLAY);

const propTypes = {
  children: PropTypes.node.isRequired,
  onOutsideClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  useCapture: PropTypes.bool,
  display: PropTypes.oneOf(DISPLAY_VALUES),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  disabled: false,
  useCapture: true,
  display: DISPLAY.BLOCK,
};

export default class OutsideClickHandler extends React.Component {
  constructor(...args) {
    super(...args);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.setChildNodeRef = this.setChildNodeRef.bind(this);
  }
  
  componentDidMount() {
    const { disabled, useCapture } = this.props;
    
    if (!disabled) this.addMouseDownEventListener(useCapture);
  }

  componentDidUpdate({ disabled: prevDisabled }) {
    const { disabled, useCapture } = this.props;
    if (prevDisabled !== disabled) {
      if (disabled) {
        this.removeEventListeners();
      } else {
        this.addMouseDownEventListener(useCapture);
      }
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }
  onMouseDown(e) {
    const { useCapture } = this.props;

    const isDescendantOfRoot = this.childNode && contains(this.childNode, e.target);
    if (!isDescendantOfRoot) {
      if (this.removeMouseUp) {
        this.removeMouseUp();
        this.removeMouseUp = null;
      }
      this.removeMouseUp = addEventListener(
        document,
        'mouseup',
        this.onMouseUp,
        { capture: useCapture },
      );
    }
  }
  onMouseUp(e) {
    const { onOutsideClick } = this.props;

    const isDescendantOfRoot = this.childNode && contains(this.childNode, e.target);
    if (this.removeMouseUp) {
      this.removeMouseUp();
      this.removeMouseUp = null;
    }

    if (!isDescendantOfRoot) {
      onOutsideClick(e);
    }
  }

  setChildNodeRef(ref) {
    this.childNode = ref;
  }

  addMouseDownEventListener(useCapture) {
    this.removeMouseDown = addEventListener(
      document,
      'mousedown',
      this.onMouseDown,
      { capture: useCapture },
    );
  }

  removeEventListeners() {
    if (this.removeMouseDown) this.removeMouseDown();
    if (this.removeMouseUp) this.removeMouseUp();
  }

  render() {
    const { children, display } = this.props;
    return (
      <div
        ref={this.setChildNodeRef}
        style={
          display !== DISPLAY.BLOCK && DISPLAY_VALUES.includes(display)
            ? { display }
            : undefined
        }
        className={this.props.className}
        onClick={this.props.onClick}
      >
        {children}
      </div>
    );
  }
}

OutsideClickHandler.propTypes = propTypes;
OutsideClickHandler.defaultProps = defaultProps;