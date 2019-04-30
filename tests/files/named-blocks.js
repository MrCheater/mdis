// mdis-start imports
import React from 'react';
// mdis-stop imports

// mdis-start NamedBlocks
// mdis-start Sample
class NamedBlocks extends React.PureComponent {
  // mdis-stop Sample
  componentDidMount() {
    // mdis-start for-i-j
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        // some code
        // mdis-stop for-i-j
        console.log({ i, j })
        // mdis-start for-i-j
      }
    }
    // mdis-stop for-i-j
    this.props.callback();
  }

  // mdis-start render
  render() {
    return <div>Sample</div>;
  }
  // mdis-stop render
  // mdis-start Sample
}
// mdis-stop Sample
// mdis-stop NamedBlocks
