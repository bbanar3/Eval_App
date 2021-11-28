import React from 'react';
import './App.css';
import ReactCursorPosition, { INTERACTIONS } from 'react-cursor-position';
import pad1_training_cont from "./color_2d_plot1_with_LSR.png";
import pad1_rc from "./Plot1_rhythmic_complexity.png";
import pad1_nr from "./Plot1_note_range.png";
import pad2_training_cont from "./color_2d_plot2_with_LSR.png";
import pad2_nd from "./Plot2_note_density.png";
import pad2_aij from "./Plot2_avg_int.png";
import image_architecture from "./figure_with_LSR.png";
import ReactAudioPlayer from 'react-audio-player';
import { ImageBackground } from "react-native";
import styled from 'styled-components';

var if_LSR = true;

var metric1 = (0.1865 + 5.4) / (12) * 287; //151;
var metric2 = (287 - (-0.1383 + 6.1) / (11.5) * 287); // 151;
var metric3 = (0.1970 + 2.8) / (6) * 287; // 151;
var metric4 = (287 - (-0.94 + 4.0) / (14) * 287); // 151;

var source_pianoroll_file_name = "test_midi_original.png";
var source_mp3_file_name = "test_midi_original.mp3";

var original_page_width = 1920;
var original_page_height = 906;

var pad_image_1 = pad1_rc;
var pad_image_2 = pad2_nd;


// ******************************* Figure Toggles *********************************************************************


const Switch_Pad1 = styled.div`
  font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: #e4e4e4;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
`;

const SwitchRadio_Pad1 = styled.input`
  display: none;
`;

const SwitchSelection_Pad1 = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: #216BA5;
  border-radius: 3px;
  transition: left 0.25s ease-out;
`;

const SwitchLabel_Pad1 = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  width: ${(props) => props.width}px;
  line-height: ${(props) => props.lineheight}px;
  font-size: ${(props) => props.fontsize}px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  cursor: pointer;

  ${SwitchRadio_Pad1}:checked + &{
    transition: 0.15s ease-out;
    color: #fff;
  }
  
`;

const titleCase_Pad1 = str =>
  str.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

const ClickableLabel_Pad1 = ({ title, onChange, id, current_width, current_height }) =>
  <SwitchLabel_Pad1 onClick={() => onChange(title)} className={id} width={100 * current_width / original_page_width} lineheight={26 * current_height / original_page_height} fontsize={11 * current_width / original_page_width}>
    {titleCase_Pad1(title)}
  </SwitchLabel_Pad1>;

const ConcealedRadio_Pad1 = ({ value, selected }) =>
  <SwitchRadio_Pad1 type="radio" name="switch1" checked={selected === value} />;

class ToggleSwitch_Pad1 extends React.Component {
  state = { selected: this.props.selected };

  handleChange = val => {
    this.setState({ selected: val });
    if (val == 'Train Data Contr') {
      pad_image_1 = pad1_training_cont;
    }
    else if (val == 'RC Surface Map') {
      pad_image_1 = pad1_rc;
    }
    else if (val == 'NR Surface Map') {
      pad_image_1 = pad1_nr;
    }
    this.props.update2DFigures1();
  };

  selectionStyle_Pad1 = () => {
    return {
      left: `${this.props.values.indexOf(this.state.selected) / 3 * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <Switch_Pad1 width={300 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} top={275 * this.props.current_height / original_page_height} left={603 * this.props.current_width / original_page_width}>
        {this.props.values.map(val => {
          return (
            <span>
              <ConcealedRadio_Pad1 value={val} selected={selected} />
              <ClickableLabel_Pad1 title={val} onChange={this.handleChange} current_width={this.props.current_width} current_height={this.props.current_height} />
            </span>
          );
        })}
        <SwitchSelection_Pad1 style={this.selectionStyle_Pad1()} width={100 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} />
      </Switch_Pad1>
    );
  }
}

// *******

const Switch_Pad2 = styled.div`
  font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  background-color: #e4e4e4;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
`;

const SwitchRadio_Pad2 = styled.input`
  display: none;
`;

const SwitchSelection_Pad2 = styled.span`
  display: block;
  position: absolute;
  z-index: 1;
  top: 0px;
  left: 0px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: #216BA5;
  border-radius: 3px;
  transition: left 0.25s ease-out;
`;

const SwitchLabel_Pad2 = styled.label`
  position: relative;
  z-index: 2;
  float: left;
  width: ${(props) => props.width}px;
  line-height: ${(props) => props.lineheight}px;
  font-size: ${(props) => props.fontsize}px;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  cursor: pointer;

  ${SwitchRadio_Pad2}:checked + &{
    transition: 0.15s ease-out;
    color: #fff;
  }
  
`;

const titleCase_Pad2 = str =>
  str.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');

const ClickableLabel_Pad2 = ({ title, onChange, id, current_width, current_height }) =>
  <SwitchLabel_Pad2 onClick={() => onChange(title)} className={id} width={100 * current_width / original_page_width} lineheight={26 * current_height / original_page_height} fontsize={11 * current_width / original_page_width}>
    {titleCase_Pad2(title)}
  </SwitchLabel_Pad2>;

const ConcealedRadio_Pad2 = ({ value, selected }) =>
  <SwitchRadio_Pad2 type="radio" name="switch2" checked={selected === value} />;

class ToggleSwitch_Pad2 extends React.Component {
  state = { selected: this.props.selected };

  handleChange = val => {
    this.setState({ selected: val });
    if (val == 'Train Data Contr') {
      pad_image_2 = pad2_training_cont;
    }
    else if (val == 'ND Surface Map') {
      pad_image_2 = pad2_nd;
    }
    else if (val == 'AIJ Surface Map') {
      pad_image_2 = pad2_aij;
    }
    this.props.update2DFigures2();
  };

  selectionStyle_Pad2 = () => {
    return {
      left: `${this.props.values.indexOf(this.state.selected) / 3 * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <Switch_Pad2 width={300 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} top={275 * this.props.current_height / original_page_height} left={1003 * this.props.current_width / original_page_width}>
        {this.props.values.map(val => {
          return (
            <span>
              <ConcealedRadio_Pad2 value={val} selected={selected} />
              <ClickableLabel_Pad2 title={val} onChange={this.handleChange} current_width={this.props.current_width} current_height={this.props.current_height} />
            </span>
          );
        })}
        <SwitchSelection_Pad2 style={this.selectionStyle_Pad2()} width={100 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} />
      </Switch_Pad2>
    );
  }
}


// ******************************* General Material / Big Text / Headers **********************************************

function TextTitle(props) {

  const text_title_style = {
    top: (20 * props.current_height / original_page_height) + 'px',
    left: (20 * props.current_width / original_page_width) + 'px',
    fontSize: (32 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='text_title' style={text_title_style}> Explainable AI via <br /> Latent Space Regularisation </h1>
  );

};

function TextLatentValuesLabel(props) {

  const text_latent_values_label_style = {
    top: (720 * props.current_height / original_page_height) + 'px',
    left: (400 * props.current_width / original_page_width) + 'px',
    fontSize: (32 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='text_latent_values_label' style={text_latent_values_label_style}> Latent Vector Values: </h1>
  );

};


function DisplayMetric1(props) {
  const display_metric_1_style = {
    top: (770 * props.current_height / original_page_height) + 'px',
    left: (400 * props.current_width / original_page_width) + 'px',
    font: (32 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  var metric1_quantized = Math.floor(metric1 / 30) + 1;
  var metric1_latent_values = [-1.8, -1.35555556, -0.91111111, -0.46666667, -0.02222222, 0.42222222, 0.86666667, 1.31111111, 1.75555556, 2.2]; // from -1.5 to 1.5

  return (
    <h1 className='display_metric1' style={display_metric_1_style}> Rhy Complx:  {(metric1_latent_values[metric1_quantized - 1] * 3.0).toFixed(1)}</h1>
  );
};

function DisplayMetric2(props) {
  const display_metric_2_style = {
    top: (770 * props.current_height / original_page_height) + 'px',
    left: (700 * props.current_width / original_page_width) + 'px',
    font: (32 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  var metric2_quantized = Math.floor(metric2 / 30) + 1;

  metric2_quantized = 11 - metric2_quantized; //Y axis works in the opposite direction with 10 discrete levels, so 10 -
  var metric2_latent_values = [-1.0090625762939454, -0.8182210624217987, -0.5892112457752228, -0.36020142912864683, -0.16935991525650018, 0.059649901390075755, 0.28865971803665147, 0.5176695346832276, 0.7085110485553741, 0.8993525624275205]; // from -1.5 to 1.5

  return (
    <h1 className='display_metric2' style={display_metric_2_style}> Note Range:  {(metric2_latent_values[metric2_quantized - 1] * 6.0).toFixed(1)}</h1>
  );
};

function DisplayMetric3(props) {
  const display_metric_3_style = {
    top: (770 * props.current_height / original_page_height) + 'px',
    left: (1000 * props.current_width / original_page_width) + 'px',
    font: (32 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  var metric3_quantized = Math.floor(metric3 / 30) + 1;
  var metric3_latent_values = [-1.6128587484359742, -1.3588566422462462, -0.596850323677063, -0.19044695377349852, 0.16515599489212018, 0.5207589435577393, 0.9271623134613036, 1.2827652621269228, 1.5875677895545959, 1.8415698957443238];

  return (
    <h1 className='display_metric3' style={display_metric_3_style}> Note Density:  {(metric3_latent_values[metric3_quantized - 1] * 1.75).toFixed(1)}</h1>
  );
};

function DisplayMetric4(props) {
  const display_metric_4_style = {
    top: (770 * props.current_height / original_page_height) + 'px',
    left: (1300 * props.current_width / original_page_width) + 'px',
    font: (32 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }


  var metric4_quantized = Math.floor(metric4 / 30) + 1;

  metric4_quantized = 11 - metric4_quantized; //Y axis works in the opposite direction with 10 discrete levels, so 10 -

  var metric4_latent_values = [-4, -2.44, -0.88, 0.66, 2.22, 3.77, 5.33, 6.88, 8.44, 10]; // Non LSR, from -1.5 to 1.5

  if (if_LSR) {
    var scale_coeff = 1.0;
  }
  else {
    var scale_coeff = 1.0;
  }

  return (
    <h1 className='display_metric4' style={display_metric_4_style}> Avg Interval Jump:  {(metric4_latent_values[metric4_quantized - 1] * scale_coeff).toFixed(1)}</h1>
  );
};

function TextInput(props) {

  const text_input_style = {
    top: (270 * props.current_height / original_page_height) + 'px',
    left: (185 * props.current_width / original_page_width) + 'px',
    fontSize: (32 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='text_input' style={text_input_style}> Input MIDI </h1>
  );
};

function TextOutputVariations(props) {

  const text_output_style = {
    top: (270 * props.current_height / original_page_height) + 'px',
    left: (1400 * props.current_width / original_page_width) + 'px',
    fontSize: (32 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_output_variations' style={text_output_style}> Output MIDI (Input Variations) </h1>
  );

};

function ImageComponentArchitecture(props) {
  const image_architecture_style = {
    top: (0 * props.current_height / original_page_height) + 'px',
    left: (500 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="image_architecture" style={image_architecture_style}>
      <img src={props.name} width={943 * props.current_width / original_page_width} height={264 * props.current_height / original_page_height} />
    </div>
  );

};

function TextReference(props) {

  const text_reference_style = {
    top: (845 * props.current_height / original_page_height) + 'px',
    left: (20 * props.current_width / original_page_width) + 'px',
    font: (18 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  return (
    <h1 className='text_reference' style={text_reference_style}> Augmentation of Ashis Pati and Alexander Lerch's "Latent Space Regularization for Explicit Control of Musical Attributes" (2019) and <br /> "Attribute-based Regularization of Latent Spaces for Variational Auto-Encoders" (2020).  </h1>
  );
};

function TextSignature(props) {

  const text_signature_style = {
    top: (865 * props.current_height / original_page_height) + 'px',
    left: (1800 * props.current_width / original_page_width) + 'px',
    font: (18 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  return (
    <h1 className='text_signature' style={text_signature_style}> 2021. </h1>
  );
};

// ******************************* Pads **********************************************

class Pads extends React.Component {

  render() {
    return (
      <div>
        <Pad1 doTheUpdate={this.props.doTheUpdateEvent} current_height={this.props.current_height} current_width={this.props.current_width} pad1_image_name={this.props.pad1_image_name} />
        <Pad2 doTheUpdate={this.props.doTheUpdateEvent} current_height={this.props.current_height} current_width={this.props.current_width} pad2_image_name={this.props.pad2_image_name} />
      </div>
    );
  }
}

// ******************************* Pad 1**********************************************

function Pad1(props) {

  const pad1_style = {
    top: (350 * props.current_height / original_page_height) + 'px',
    left: (600 * props.current_width / original_page_width) + 'px',
    width: (300 * props.current_width / original_page_width) + 'px',
    height: (300 * props.current_width / original_page_width) + 'px',
  }

  return (
    <ReactCursorPosition className="pad1"
      activationInteractionMouse={INTERACTIONS.CLICK}
      style={pad1_style}
      onPositionChanged={props.doTheUpdate}
    >
      <PositionLabel1 current_height={props.current_height} current_width={props.current_width} pad1_image_name={props.pad1_image_name} />
    </ReactCursorPosition>
  );
}

const PositionLabel1 = (props) => {
  const {
    detectedEnvironment: {
      isMouseDetected = false,
      isTouchDetected = false
    } = {},
    elementDimensions: {
      width = 0,
      height = 0
    } = {},
    isActive = false,
    isPositionOutside = false,
    position: {
      x = 0,
      y = 0
    } = {}
  } = props;

  if (isActive == true) {
    metric1 = Math.floor(x / props.current_width * original_page_width);
    metric2 = Math.floor(y / props.current_width * original_page_width);
  }

  const pad1_background_image_style = {
    height: (287 * props.current_width / original_page_width) + 'px',
    width: (287 * props.current_width / original_page_width) + 'px',
  }



  return (
    <div className="pad1__label">
      <ImageBackground source={props.pad1_image_name} style={pad1_background_image_style} >
        <DisplayMetric1 current_height={props.current_height} current_width={props.current_width} />
        <DisplayMetric2 current_height={props.current_height} current_width={props.current_width} />
        <svg height={(287 * props.current_height / original_page_height) + ''} width={(287 * props.current_width / original_page_width) + ''}>
          <circle cx={(0.1865 + 5.4) / (12) * 287 * props.current_width / original_page_width - 5 * props.current_width / original_page_width} cy={(287 - (-0.1383 + 6.1) / (11.5) * 287) * props.current_width / original_page_width - 6 * props.current_width / original_page_width} r={5 * props.current_width / original_page_width} fill='white' />
          <circle cx={metric1 * props.current_width / original_page_width - 5 * props.current_width / original_page_width} cy={metric2 * props.current_width / original_page_width - 6 * props.current_width / original_page_width} r={10 * props.current_width / original_page_width} fill='red' />
        </svg>
      </ImageBackground>
      <Pad1ActiveIndicator isActive={isActive} current_height={props.current_height} current_width={props.current_width} />

    </div>
  );
};


function Pad1ActiveIndicator(props) {
  if (props.isActive == true) {
    var active_text = 'Click on the Pad to Freeze: On';
    var text_color = 'green';
  }
  else {
    var active_text = 'Click on the Pad to Activate: Off';
    var text_color = 'red';
  }

  const pad1_active_indicator_style = {
    top: (300 * props.current_height / original_page_height) + 'px',
    left: (615 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: text_color,
  }

  return (
    <h1 className='pad1_active_indicator' style={pad1_active_indicator_style}> {active_text} </h1>
  );
}



// ******************************* Pad 2 **********************************************


function Pad2(props) {

  const pad2_style = {
    top: (350 * props.current_height / original_page_height) + 'px',
    left: (1000 * props.current_width / original_page_width) + 'px',
    width: (300 * props.current_width / original_page_width) + 'px',
    height: (300 * props.current_width / original_page_width) + 'px',
  }

  return (
    <ReactCursorPosition className="pad2"
      activationInteractionMouse={INTERACTIONS.CLICK}
      style={pad2_style}
      onPositionChanged={props.doTheUpdate}
    >
      <PositionLabel2 current_height={props.current_height} current_width={props.current_width} pad2_image_name={props.pad2_image_name} />
    </ReactCursorPosition>
  );
}

const PositionLabel2 = (props) => {
  const {
    detectedEnvironment: {
      isMouseDetected = false,
      isTouchDetected = false
    } = {},
    elementDimensions: {
      width = 0,
      height = 0
    } = {},
    isActive = false,
    isPositionOutside = false,
    position: {
      x = 0,
      y = 0
    } = {}
  } = props;

  if (isActive == true) {
    metric3 = Math.floor(x / props.current_width * original_page_width);
    metric4 = Math.floor(y / props.current_width * original_page_width);
  }

  const pad2_background_image_style = {
    height: (287 * props.current_width / original_page_width) + 'px',
    width: (287 * props.current_width / original_page_width) + 'px',
  }


  return (
    <div className="pad2__label">
      <ImageBackground source={props.pad2_image_name} style={pad2_background_image_style}>
        <DisplayMetric3 current_height={props.current_height} current_width={props.current_width} />
        <DisplayMetric4 current_height={props.current_height} current_width={props.current_width} />
        <svg height={(287 * props.current_height / original_page_height) + ''} width={(287 * props.current_width / original_page_width) + ''}>
          <circle cx={(0.1970 + 2.8) / (6) * 287 * props.current_width / original_page_width - 5 * props.current_width / original_page_width} cy={(287 - (-0.94 + 4.0) / (14) * 287) * props.current_width / original_page_width - 6 * props.current_width / original_page_width} r={5 * props.current_width / original_page_width} fill='white' />
          <circle cx={metric3 * props.current_width / original_page_width - 5 * props.current_width / original_page_width} cy={metric4 * props.current_width / original_page_width - 6 * props.current_width / original_page_width} r={10 * props.current_width / original_page_width} fill='red' />
        </svg>
      </ImageBackground>
      <Pad2ActiveIndicator isActive={isActive} current_height={props.current_height} current_width={props.current_width} />
    </div>
  );
};



function Pad2ActiveIndicator(props) {
  if (props.isActive == true) {
    var active_text = 'Click on the Pad to Freeze: On';
    var text_color = 'green';
  }
  else {
    var active_text = 'Click on the Pad to Activate: Off';
    var text_color = 'red';
  }

  const pad2_active_indicator_style = {
    top: (300 * props.current_height / original_page_height) + 'px',
    left: (1015 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: text_color,
  }

  return (
    <h1 className='pad2_active_indicator' style={pad2_active_indicator_style}>  {active_text} </h1>
  );
}



// ********************************* Small Helper Texts ********************************************

function X1_label(props) {
  const x1_label_style = {
    top: (645 * props.current_height / original_page_height) + 'px',
    left: (640 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
  }


  return (
    <h1 className='x1_label' style={x1_label_style}> Rhythmic Complexity Level <br /> Latent Dimension = 0</h1>
  );
}

function Y1_label(props) {
  const y1_label_style = {
    top: (475 * props.current_height / original_page_height) + 'px',
    left: (480 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='y1_label' style={y1_label_style}> Note Range Level <br /> Latent Dimension = 1</h1>
  );

}

function X2_label(props) {
  const x2_label_style = {
    top: (645 * props.current_height / original_page_height) + 'px',
    left: (1060 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='x2_label' style={x2_label_style}>Note Density Level <br /> Latent Dimension = 2</h1>
  );
}

function Y2_label(props) {
  const y2_label_style = {
    top: (475 * props.current_height / original_page_height) + 'px',
    left: (860 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='y2_label' style={y2_label_style}>Average Interval Jump Level <br /> Latent Dimension = 3</h1>
  );
}

function Pad1_X0(props) {
  const pad1_x0_style = {
    top: (640 * props.current_height / original_page_height) + 'px',
    left: (590 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad1_x0' style={pad1_x0_style} >-5.4</h1>
  );
}

function Pad1_X1(props) {
  const pad1_x1_style = {
    top: (640 * props.current_height / original_page_height) + 'px',
    left: (890 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad1_x1' style={pad1_x1_style}>6.6</h1>
  );
}

function Pad1_Y0(props) {
  const pad1_y0_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (570 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad1_y0' style={pad1_y0_style}>-6.1</h1>
  );
}

function Pad1_Y1(props) {
  const pad1_y1_style = {
    top: (320 * props.current_height / original_page_height) + 'px',
    left: (575 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad1_y1' style={pad1_y1_style}>5.4</h1>
  );
}

function Pad2_X0(props) {
  const pad2_x0_style = {
    top: (640 * props.current_height / original_page_height) + 'px',
    left: (990 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad2_x0' style={pad2_x0_style}>-2.8</h1>
  );
}

function Pad2_X1(props) {
  const pad2_x1_style = {
    top: (640 * props.current_height / original_page_height) + 'px',
    left: (1290 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad2_x1' style={pad2_x1_style}>3.2</h1>
  );
}

function Pad2_Y0(props) {
  const pad2_y0_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (970 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad2_y0' style={pad2_y0_style}>-4.0</h1>
  );
}

function Pad2_Y1(props) {
  const pad2_y1_style = {
    top: (320 * props.current_height / original_page_height) + 'px',
    left: (970 * props.current_width / original_page_width) + 'px',
    font: (16 * props.current_width / original_page_width) + 'px/1.5 Helvetica, Arial',
    fontWeight: 'bold',
  }
  return (
    <h1 className='pad2_y1' style={pad2_y1_style}>10.0</h1>
  );
}

function Pad1_2D_Display_Title(props) {
  const pad1_2d_display_title = {
    top: (230 * props.current_height / original_page_height) + 'px',
    left: (678 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }
  return (
    <h1 className='pad1_2d_display_title' style={pad1_2d_display_title}> 2D Display Mode: </h1>
  );
}

function Pad2_2D_Display_Title(props) {
  const pad2_2d_display_title = {
    top: (230 * props.current_height / original_page_height) + 'px',
    left: (1076 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }
  return (
    <h1 className='pad2_2d_display_title' style={pad2_2d_display_title}> 2D Display Mode: </h1>
  );
}

// ************************************** Source Music Pianoroll and Audio Material ****************************************

function ImageComponentSourceMusic(props) {
  const image_source_music_style = {
    top: (350 * props.current_height / original_page_height) + 'px',
    left: (-20 * props.current_width / original_page_width) + 'px',
  }

  return (
    <div className="image_source_music" style={image_source_music_style}>
      <img src={`${process.env.PUBLIC_URL}/pianoroll_files/` + props.name} width={550 * props.current_width / original_page_width} height={275 * props.current_height / original_page_height} />
    </div>
  );
};

function Audio_Player_Source(props) {
  var mp3_file_name = props.name;
  const audio_player_source_style = {
    top: (660 * props.current_height / original_page_height) + 'px',
    left: (55 * props.current_width / original_page_width) + 'px',
    width: (400 * props.current_width / original_page_width) + 'px',
    height: (50 * props.current_width / original_page_width) + 'px'
  }

  return (
    <ReactAudioPlayer
      className="audio_player_source"
      src={mp3_file_name}
      controls
      style={audio_player_source_style}
    />
  );
}

// ************************************** Generated Music Pianoroll and Audio Material ****************************************
function ImageComponentGeneratedMusic_Pad1(props) {
  const image_generated_music1_style = {
    top: (350 * props.current_height / original_page_height) + 'px',
    left: (1350 * props.current_width / original_page_width) + 'px',
  }

  return (
    <div className="image_generated_music1" style={image_generated_music1_style}>
      <img src={`${process.env.PUBLIC_URL}/pianoroll_files/` + props.name} width={550 * props.current_width / original_page_width} height={275 * props.current_height / original_page_height} />
    </div>
  );
};


function Audio_Player_Generated_Pad1(props) {
  const audio_player_generated1_style = {
    top: (660 * props.current_height / original_page_height) + 'px',
    left: (1430 * props.current_width / original_page_width) + 'px',
    width: (400 * props.current_width / original_page_width) + 'px',
    height: (50 * props.current_width / original_page_width) + 'px',
  }
  return (
    <ReactAudioPlayer
      className="audio_player_generated1"
      src={`${process.env.PUBLIC_URL}/mp3_files/` + props.name}
      controls
      style={audio_player_generated1_style}
    />
  );
}


// ************************************** App ****************************************

class CreateContact extends React.Component {
  state = {
    windowHeight: undefined,
    windowWidth: undefined,
    gen_pianoroll_file_name: source_pianoroll_file_name,
    gen_mp3_file_name: source_mp3_file_name,
    pad1_image_name: pad_image_1,
    pad2_image_name: pad_image_2,
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  current_page_width = this.state.windowWidth;
  current_page_height = this.state.windowHeight;

  doTheUpdate() {

    var metric1_quantized = Math.floor(metric1 / 30) + 1;
    var metric2_quantized = Math.floor(metric2 / 30) + 1;
    var metric3_quantized = Math.floor(metric3 / 30) + 1;
    var metric4_quantized = Math.floor(metric4 / 30) + 1;

    metric2_quantized = 11 - metric2_quantized; //Y axis works in the opposite direction with 10 discrete levels, so 10 -
    metric4_quantized = 11 - metric4_quantized; //Y axis works in the opposite direction with 10 discrete levels, so 10 -

    var gen_pianoroll_filename = "midi_" + metric1_quantized + "_" + metric2_quantized + "_" + metric3_quantized + "_" + metric4_quantized + ".png";

    var gen_mp3_filename = "midi_" + metric1_quantized + "_" + metric2_quantized + "_" + metric3_quantized + "_" + metric4_quantized + ".mp3";

    this.setState({ gen_pianoroll_file_name: gen_pianoroll_filename });
    this.setState({ gen_mp3_file_name: gen_mp3_filename });
    this.setState({ pad1_image_name: pad_image_1 });
    this.setState({ pad2_image_name: pad_image_2 });
  }


  render() {
    return (
      <div>

        <TextTitle current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextLatentValuesLabel current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <ToggleSwitch_Pad1 update2DFigures1={this.doTheUpdate.bind(this)} values={['Train Data Contr', 'RC Surface Map', 'NR Surface Map']} selected="RC Surface Map" current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ToggleSwitch_Pad2 update2DFigures2={this.doTheUpdate.bind(this)} values={['Train Data Contr', 'ND Surface Map', 'AIJ Surface Map']} selected="ND Surface Map" current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <Pads doTheUpdateEvent={this.doTheUpdate.bind(this)} current_height={this.state.windowHeight} current_width={this.state.windowWidth} pad1_image_name={this.state.pad1_image_name} pad2_image_name={this.state.pad2_image_name} />

        <ImageComponentGeneratedMusic_Pad1 name={this.state.gen_pianoroll_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Audio_Player_Generated_Pad1 name={this.state.gen_mp3_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <X1_label current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Y1_label current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <X2_label current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Y2_label current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad1_X0 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad1_X1 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad1_Y0 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad1_Y1 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad2_X0 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad2_X1 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad2_Y0 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad2_Y1 current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <Pad1_2D_Display_Title current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad2_2D_Display_Title current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <Audio_Player_Source name={"./mp3_files/" + source_mp3_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageComponentSourceMusic name={source_pianoroll_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <TextInput current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextOutputVariations current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <ImageComponentArchitecture name={image_architecture} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <TextReference current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextSignature current_height={this.state.windowHeight} current_width={this.state.windowWidth} />


      </div>
    );
  }
}


function App() {

  return (
    <div className="App">
      <CreateContact />
    </div>
  );
}

export default App;





