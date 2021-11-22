# react-outside-click-wrapper

A React component wrapper for handling outside clicks.

>NOTE : It's fork of an insane package https://www.npmjs.com/package/react-outside-click-handler-lite, I've made few changes so that it allows the user to add className prop to the component for any kind of styling.

## Usage

```jsx
import OutsideClickHandler from 'react-outside-click-handler-lite';

function MyComponent() {
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        alert('You clicked outside of this component!!!');
      }}
    >
      Hello World
    </OutsideClickHandler>
  );
}
```