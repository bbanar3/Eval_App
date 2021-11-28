import React from 'react';
import './App.css';
import pad1_training_cont from "./color_2d_plot1_with_LSR.png";
import pad1_rc from "./Plot1_rhythmic_complexity.png";
import pad1_nr from "./Plot1_note_range.png";
import pad2_training_cont from "./color_2d_plot2_with_LSR.png";
import pad2_nd from "./Plot2_note_density.png";
import pad2_aij from "./Plot2_avg_int.png";

import ReactAudioPlayer from 'react-audio-player';
import styled from 'styled-components';

var if_LSR = true;

var metric1 = (0.1865 + 5.4) / (12) * 287; //151;
var metric2 = (287 - (-0.1383 + 6.1) / (11.5) * 287); // 151;
var metric3 = (0.1970 + 2.8) / (6) * 287; // 151;
var metric4 = (287 - (-0.94 + 4.0) / (14) * 287); // 151;

var source_pianoroll_file_name = "EW_684.png";
var source_mp3_file_name = "EW_684.mp3";

var image_input_hist_pitch_count = "Earlier_pitch_count.png"
var image_input_hist_pitch_range = "Earlier_pitch_range2.png"
var image_input_hist_avg_duration = "Earlier_avg_duration.png"
var image_input_hist_avg_velocity = "Earlier_avg_velocity.png"
var image_input_hist_chroma_metric = "Earlier_chroma.png"
var image_input_hist_chords_metric = "Earlier_chords.png"

var image_output_hist_pitch_count = "EW_pitch_count2.png"
var image_output_hist_pitch_range = "EW_pitch_range.png"
var image_output_hist_avg_duration = "EW_avg_duration2.png"
var image_output_hist_avg_velocity = "EW_avg_velocity2.png"
var image_output_hist_chroma_metric = "EW_chroma2.png"
var image_output_hist_chords_metric = "EW_chords2.png"


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
    if (val == 'Exag. Classical') {
      pad_image_1 = pad1_training_cont;
    }
    else if (val == 'Base') {
      pad_image_1 = pad1_rc;
    }
    else if (val == 'Exag. 20th Century') {
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
      <Switch_Pad1 width={300 * this.props.current_width / original_page_width} height={50 * this.props.current_height / original_page_height} top={370 * this.props.current_height / original_page_height} left={150 * this.props.current_width / original_page_width}>
        {this.props.values.map(val => {
          return (
            <span>
              <ConcealedRadio_Pad1 value={val} selected={selected} />
              <ClickableLabel_Pad1 title={val} onChange={this.handleChange} current_width={this.props.current_width} current_height={this.props.current_height} />
            </span>
          );
        })}
        <SwitchSelection_Pad1 style={this.selectionStyle_Pad1()} width={100 * this.props.current_width / original_page_width} height={50 * this.props.current_height / original_page_height} />
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
  <SwitchLabel_Pad2 onClick={() => onChange(title)} className={id} width={150 * current_width / original_page_width} lineheight={26 * current_height / original_page_height} fontsize={11 * current_width / original_page_width}>
    {titleCase_Pad2(title)}
  </SwitchLabel_Pad2>;

const ConcealedRadio_Pad2 = ({ value, selected }) =>
  <SwitchRadio_Pad2 type="radio" name="switch2" checked={selected === value} />;

class ToggleSwitch_Pad2 extends React.Component {
  state = { selected: this.props.selected };

  handleChange = val => {
    this.setState({ selected: val });
    if (val == 'Well Trained') {
      pad_image_2 = pad2_training_cont;
    }
    else if (val == 'Poorly Trained') {
      pad_image_2 = pad2_nd;
    }
    this.props.update2DFigures2();
  };

  selectionStyle_Pad2 = () => {
    return {
      left: `${this.props.values.indexOf(this.state.selected) / 2 * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <Switch_Pad2 width={300 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} top={500 * this.props.current_height / original_page_height} left={150 * this.props.current_width / original_page_width}>
        {this.props.values.map(val => {
          return (
            <span>
              <ConcealedRadio_Pad2 value={val} selected={selected} />
              <ClickableLabel_Pad2 title={val} onChange={this.handleChange} current_width={this.props.current_width} current_height={this.props.current_height} />
            </span>
          );
        })}
        <SwitchSelection_Pad2 style={this.selectionStyle_Pad2()} width={150 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} />
      </Switch_Pad2>
    );
  }
}


// ******************************* General Material / Big Text / Headers **********************************************

function TextTitle(props) {

  const text_title_style = {
    top: (-20 * props.current_height / original_page_height) + 'px',
    left: (530 * props.current_width / original_page_width) + 'px',
    fontSize: (32 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_title' style={text_title_style}> A Systematic Evaluation of GPT-2-based Music Generation </h1>
  );

};

function TextInputSetStats(props) {

  const text_latent_values_label_style = {
    top: (10 * props.current_height / original_page_height) + 'px',
    left: (20 * props.current_width / original_page_width) + 'px',
    fontSize: (26 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='text_latent_values_label' style={text_latent_values_label_style}> Training (Fine-tuning) Set Stats: </h1>
  );

};

function TextGeneratedSetStats(props) {

  const text_latent_values_label_style = {
    top: (550 * props.current_height / original_page_height) + 'px',
    left: (20 * props.current_width / original_page_width) + 'px',
    fontSize: (26 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='text_latent_values_label' style={text_latent_values_label_style}> Generated Set Stats: </h1>
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

function TextOutputVariations(props) {

  const text_output_style = {
    top: (275 * props.current_height / original_page_height) + 'px',
    left: (850 * props.current_width / original_page_width) + 'px',
    fontSize: (26 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_output_variations' style={text_output_style}> Generated Sample: </h1>
  );

};
// ********************* Input Histograms **************************************************************
function ImageInputPitchCount(props) {
  const input_pitch_count_style = {
    top: (70 * props.current_height / original_page_height) + 'px',
    left: (100 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="input_pitch_count" style={input_pitch_count_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/EARLIER/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageInputPitchRange(props) {
  const input_pitch_range_style = {
    top: (70 * props.current_height / original_page_height) + 'px',
    left: (400 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="input_pitch_range" style={input_pitch_range_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/EARLIER/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageInputAvgDuration(props) {
  const input_avg_duration_style = {
    top: (70 * props.current_height / original_page_height) + 'px',
    left: (700 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="input_avg_duration" style={input_avg_duration_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/EARLIER/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageInputAvgVelocity(props) {
  const input_avg_velocity_style = {
    top: (70 * props.current_height / original_page_height) + 'px',
    left: (1000 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="input_avg_velocity" style={input_avg_velocity_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/EARLIER/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageInputChromaMetric(props) {
  const input_chroma_metric_style = {
    top: (70 * props.current_height / original_page_height) + 'px',
    left: (1300 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="input_chroma_metric" style={input_chroma_metric_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/EARLIER/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageInputChordsMetric(props) {
  const input_chords_metric_style = {
    top: (70 * props.current_height / original_page_height) + 'px',
    left: (1600 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="input_chords_metric" style={input_chords_metric_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/EARLIER/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

// ********************* OUTPUT Histograms **************************************************************
function ImageOutputPitchCount(props) {
  const output_pitch_count_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (100 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="output_pitch_count" style={output_pitch_count_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/EW/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageOutputPitchRange(props) {
  const output_pitch_range_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (400 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="output_pitch_range" style={output_pitch_range_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/EW/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageOutputAvgDuration(props) {
  const output_avg_duration_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (700 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="output_avg_duration" style={output_avg_duration_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/EW/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageOutputAvgVelocity(props) {
  const output_avg_velocity_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (1000 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="output_avg_velocity" style={output_avg_velocity_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/EW/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageOutputChromaMetric(props) {
  const output_chroma_metric_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (1300 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="output_chroma_metric" style={output_chroma_metric_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/EW/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

function ImageOutputChordsMetric(props) {
  const output_chords_metric_style = {
    top: (620 * props.current_height / original_page_height) + 'px',
    left: (1600 * props.current_width / original_page_width) + 'px',
  }
  return (
    <div className="output_chords_metric" style={output_chords_metric_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/EW/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

// ***********************************************************************************

function TextSignature(props) {

  const text_signature_style = {
    top: (865 * props.current_height / original_page_height) + 'px',
    left: (1850 * props.current_width / original_page_width) + 'px',
    font: (18 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  return (
    <h1 className='text_signature' style={text_signature_style}> 2021. </h1>
  );
};


// ********************************* Small Helper Texts ********************************************

function Pad1_2D_Display_Title(props) {
  const pad1_2d_display_title = {
    top: (320 * props.current_height / original_page_height) + 'px',
    left: (170 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }
  return (
    <h1 className='pad1_2d_display_title' style={pad1_2d_display_title}> Training (Fine-tuning) Corpus: </h1>
  );
}

function Pad2_2D_Display_Title(props) {
  const pad2_2d_display_title = {
    top: (440 * props.current_height / original_page_height) + 'px',
    left: (230 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }
  return (
    <h1 className='pad2_2d_display_title' style={pad2_2d_display_title}> Training Level: </h1>
  );
}

// ************************************** Musical Metric Texts ****************************************************************

function TextInputPitchCount(props) {
  const text_input_pitch_count = {
    top: (55 * props.current_height / original_page_height) + 'px',
    left: (155 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'red',
    zIndex: '999'
  }
  return (
    <h1 className='text_input_pitch_count' style={text_input_pitch_count}> Pitch Count </h1>
  );
}

function TextInputPitchRange(props) {
  const text_input_pitch_range = {
    top: (55 * props.current_height / original_page_height) + 'px',
    left: (457 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'orange',
    zIndex: '999'
  }
  return (
    <h1 className='text_input_pitch_range' style={text_input_pitch_range}> Pitch Range </h1>
  );
}

function TextInputAvgDuration(props) {
  const text_input_avg_duration = {
    top: (55 * props.current_height / original_page_height) + 'px',
    left: (750 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'gold',
    zIndex: '999'
  }
  return (
    <h1 className='text_input_avg_duration' style={text_input_avg_duration}> Avg. Duration </h1>
  );
}

function TextInputAvgVelocity(props) {
  const text_input_avg_velocity = {
    top: (55 * props.current_height / original_page_height) + 'px',
    left: (1050 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'yellowgreen',
    zIndex: '999'
  }
  return (
    <h1 className='text_input_avg_velocity' style={text_input_avg_velocity}> Avg. Velocity </h1>
  );
}

function TextInputChroma(props) {
  const text_input_chroma = {
    top: (55 * props.current_height / original_page_height) + 'px',
    left: (1350 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'mediumblue',
    zIndex: '999'
  }
  return (
    <h1 className='text_input_chroma' style={text_input_chroma}> Chroma Metric </h1>
  );
}

function TextInputChords(props) {
  const text_input_chords = {
    top: (55 * props.current_height / original_page_height) + 'px',
    left: (1600 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'blueviolet',
    zIndex: '999'
  }
  return (
    <h1 className='text_input_chords' style={text_input_chords}> Chord Non-Traditionality </h1>
  );
}
 
// ********************* Output Metrics Texts **********************************************
function TextOutputPitchCount(props) {
  const text_output_pitch_count = {
    top: (600 * props.current_height / original_page_height) + 'px',
    left: (155 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'red',
    zIndex: '999'
  }
  return (
    <h1 className='text_output_pitch_count' style={text_output_pitch_count}> Pitch Count </h1>
  );
}

function TextOutputPitchRange(props) {
  const text_output_pitch_range = {
    top: (600 * props.current_height / original_page_height) + 'px',
    left: (457 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'orange',
    zIndex: '999'
  }
  return (
    <h1 className='text_output_pitch_range' style={text_output_pitch_range}> Pitch Range </h1>
  );
}

function TextOutputAvgDuration(props) {
  const text_output_avg_duration = {
    top: (600 * props.current_height / original_page_height) + 'px',
    left: (750 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'gold',
    zIndex: '999'
  }
  return (
    <h1 className='text_output_avg_duration' style={text_output_avg_duration}> Avg. Duration </h1>
  );
}

function TextOutputAvgVelocity(props) {
  const text_output_avg_velocity = {
    top: (600 * props.current_height / original_page_height) + 'px',
    left: (1050 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'yellowgreen',
    zIndex: '999'
  }
  return (
    <h1 className='text_output_avg_velocity' style={text_output_avg_velocity}> Avg. Velocity </h1>
  );
}

function TextOutputChroma(props) {
  const text_output_chroma = {
    top: (600 * props.current_height / original_page_height) + 'px',
    left: (1350 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'mediumblue',
    zIndex: '999'
  }
  return (
    <h1 className='text_output_chroma' style={text_output_chroma}> Chroma Metric </h1>
  );
}

function TextOutputChords(props) {
  const text_output_chords = {
    top: (600 * props.current_height / original_page_height) + 'px',
    left: (1600 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    color: 'blueviolet',
    zIndex: '999'
  }
  return (
    <h1 className='text_output_chords' style={text_output_chords}> Chord Non-Traditionality </h1>
  );
}

// ***************************************** Sliders **************************************************************************

function Slider1(props){

};

// ************************************** Generated Music Pianoroll and Audio Material ****************************************
function ImageComponentGeneratedMusic(props) {
  const image_generated_music1_style = {
    top: (325 * props.current_height / original_page_height) + 'px',
    left: (600 * props.current_width / original_page_width) + 'px',
  }

  return (
    <div className="image_generated_music1" style={image_generated_music1_style}>
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_PIANOROLL_FOR_APP/EW/` + props.name} width={675 * props.current_width / original_page_width} height={283 * props.current_height / original_page_height} />
    </div>
  );
};


function Audio_Player_Generated(props) {
  const audio_player_generated1_style = {
    top: (430 * props.current_height / original_page_height) + 'px',
    left: (1350 * props.current_width / original_page_width) + 'px',
    width: (450 * props.current_width / original_page_width) + 'px',
    height: (50 * props.current_width / original_page_width) + 'px',
  }
  return (
    <ReactAudioPlayer
      className="audio_player_generated1"
      src={`${process.env.PUBLIC_URL}/GEN_SEP_MP3_FOR_APP/EW/` + props.name}
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

    image_input_pitch_count_name: image_input_hist_pitch_count,
    image_input_pitch_range_name: image_input_hist_pitch_range,
    image_input_avg_duration_name: image_input_hist_avg_duration,
    image_input_avg_velocity_name: image_input_hist_avg_velocity,
    image_input_chroma_metric_name: image_input_hist_chroma_metric,
    image_input_chords_metric_name: image_input_hist_chords_metric,

    image_output_pitch_count_name: image_output_hist_pitch_count,
    image_output_pitch_range_name: image_output_hist_pitch_range,
    image_output_avg_duration_name: image_output_hist_avg_duration,
    image_output_avg_velocity_name: image_output_hist_avg_velocity,
    image_output_chroma_metric_name: image_output_hist_chroma_metric,
    image_output_chords_metric_name: image_output_hist_chords_metric,
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

    // var gen_pianoroll_filename = "midi_" + metric1_quantized + "_" + metric2_quantized + "_" + metric3_quantized + "_" + metric4_quantized + ".png";
    var gen_pianoroll_filename = 'EW_684.png'
    // var gen_mp3_filename = "midi_" + metric1_quantized + "_" + metric2_quantized + "_" + metric3_quantized + "_" + metric4_quantized + ".mp3";
    var gen_mp3_filename = 'EW_684.mp3'

    var input_pitch_count_histogram_filename = "Earlier_pitch_count.png";
    var input_pitch_range_histogram_filename = "Earlier_pitch_range.png";
    var input_avg_duration_histogram_filename = "Earlier_avg_duration.png";
    var input_avg_velocity_histogram_filename = "Earlier_avg_velocity.png";
    var input_chroma_metric_histogram_filename = "Earlier_chroma.png";
    var input_chords_metric_histogram_filename = "Earlier_chords.png";

    var output_pitch_count_histogram_filename = "Later_pitch_count.png";
    var output_pitch_range_histogram_filename = "Later_pitch_range.png";
    var output_avg_duration_histogram_filename = "Later_avg_duration.png";
    var output_avg_velocity_histogram_filename = "Later_avg_velocity.png";
    var output_chroma_metric_histogram_filename = "Later_chroma.png";
    var output_chords_metric_histogram_filename = "Later_chords.png";

    this.setState({ gen_pianoroll_file_name: gen_pianoroll_filename });
    this.setState({ gen_mp3_file_name: gen_mp3_filename });
    this.setState({ pad1_image_name: pad_image_1 });
    this.setState({ pad2_image_name: pad_image_2 });

    this.setState({ image_input_pitch_count_name: input_pitch_count_histogram_filename});
    this.setState({ image_input_pitch_range_name: input_pitch_range_histogram_filename});
    this.setState({ image_input_avg_duration_name: input_avg_duration_histogram_filename});
    this.setState({ image_input_avg_velocity_name: input_avg_velocity_histogram_filename});
    this.setState({ image_input_chroma_metric_name: input_chroma_metric_histogram_filename});
    this.setState({ image_input_chords_metric_name: input_chords_metric_histogram_filename});

    this.setState({ image_output_pitch_count_name: output_pitch_count_histogram_filename});
    this.setState({ image_output_pitch_range_name: output_pitch_range_histogram_filename});
    this.setState({ image_output_avg_duration_name: output_avg_duration_histogram_filename});
    this.setState({ image_output_avg_velocity_name: output_avg_velocity_histogram_filename});
    this.setState({ image_output_chroma_metric_name: output_chroma_metric_histogram_filename});
    this.setState({ image_output_chords_metric_name: output_chords_metric_histogram_filename});
  }


  render() {
    return (
      <div>

        <TextTitle current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextInputSetStats current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextGeneratedSetStats current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <ToggleSwitch_Pad1 update2DFigures1={this.doTheUpdate.bind(this)} values={['Exag. Classical', 'Base', 'Exag. 20th Century']} selected="Exag. Classical" current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ToggleSwitch_Pad2 update2DFigures2={this.doTheUpdate.bind(this)} values={['Well Trained', 'Poorly Trained']} selected="Well Trained" current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <ImageComponentGeneratedMusic name={this.state.gen_pianoroll_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Audio_Player_Generated name={this.state.gen_mp3_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <Pad1_2D_Display_Title current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad2_2D_Display_Title current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <TextInputPitchCount current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextInputPitchRange current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextInputAvgDuration current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextInputAvgVelocity current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextInputChroma current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextInputChords current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <TextOutputPitchCount current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextOutputPitchRange current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextOutputAvgDuration current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextOutputAvgVelocity current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextOutputChroma current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextOutputChords current_height={this.state.windowHeight} current_width={this.state.windowWidth} />


        {/* <TextInput current_height={this.state.windowHeight} current_width={this.state.windowWidth} /> */}
        <TextOutputVariations current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <ImageInputPitchCount name={this.state.image_input_pitch_count_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageInputPitchRange name={this.state.image_input_pitch_range_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageInputAvgDuration name={this.state.image_input_avg_duration_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageInputAvgVelocity name={this.state.image_input_avg_velocity_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageInputChromaMetric name={this.state.image_input_chroma_metric_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageInputChordsMetric name={this.state.image_input_chords_metric_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <ImageOutputPitchCount name={this.state.image_output_pitch_count_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageOutputPitchRange name={this.state.image_output_pitch_range_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageOutputAvgDuration name={this.state.image_output_avg_duration_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageOutputAvgVelocity name={this.state.image_output_avg_velocity_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageOutputChromaMetric name={this.state.image_output_chroma_metric_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ImageOutputChordsMetric name={this.state.image_output_chords_metric_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

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





