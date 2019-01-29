// mdis-start imports
import React from 'react';
// mdis-stop imports

// mdis-start Sample
class NamedBlocks extends React.PureComponent {
  // mdis-stop Sample

  componentDidMount() {
    this.props.callback();
  }

  // mdis-start render
  render() {
    /*
      Multi Line Comment
      Test test test
    */

    let str;
    str = 'abc';
    str = '\n';
    str = '"""';
    str = '```';
    str = '';
    str = ' ';
    str = "'";
    str = '"';
    str = '`';
    str = '\
    ';
    str = 'abc';
    str = '\n';
    str = "'''";
    str = '```';
    str = '';
    str = ' ';
    str = "'";
    str = '"';
    str = '`';
    str = '\
    ';
    str = `abc`;
    str = `\n`;
    str = `'''`;
    str = `"""`;
    str = ``;
    str = ` `;
    str = `\'`;
    str = `\"`;
    str = `\``;
    str = `\
    `;
    str = `
    `;

    return <div>Sample</div>;
  }
  // mdis-stop render

  // mdis-start Sample
}
// mdis-stop Sample
