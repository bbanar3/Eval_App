import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import pad1_training_cont from "./color_2d_plot1_with_LSR.png";
import pad1_rc from "./Plot1_rhythmic_complexity.png";
import pad1_nr from "./Plot1_note_range.png";
import pad2_training_cont from "./color_2d_plot2_with_LSR.png";
import pad2_nd from "./Plot2_note_density.png";
import pad2_aij from "./Plot2_avg_int.png";
// import StepRangeSlider from 'react-step-range-slider'

import ReactAudioPlayer from 'react-audio-player';
import styled from 'styled-components';

// import {RangeStepInput} from 'react-range-step-input';
import Slider from 'react-input-slider';
import { useState } from 'react';

import Svg, {Line} from 'react-native-svg';
import { TextPropTypes } from 'react-native';

var if_LSR = true;

var metric1 = (0.1865 + 5.4) / (12) * 287; //151;
var metric2 = (287 - (-0.1383 + 6.1) / (11.5) * 287); // 151;
var metric3 = (0.1970 + 2.8) / (6) * 287; // 151;
var metric4 = (287 - (-0.94 + 4.0) / (14) * 287); // 151;

var source_pianoroll_file_name = "EW_1.png";
var source_mp3_file_name = "EW_684.mp3";

var image_input_hist_pitch_count = "Middle_pitch_count3.png";
var image_input_hist_pitch_range = "Middle_pitch_range3.png";
var image_input_hist_avg_duration = "Middle_avg_duration3.png";
var image_input_hist_avg_velocity = "Middle_avg_velocity.png";
var image_input_hist_chroma_metric = "Middle_chroma3.png";
var image_input_hist_chords_metric = "Middle_chords.png";

var image_output_hist_pitch_count = "MW2/MW2_PITCH_COUNT/MW2_pitch_count_bin0.png";
var image_output_hist_pitch_range = "MW2/MW2_PITCH_RANGE/MW2_pitch_range_bin0.png";
var image_output_hist_avg_duration = "MW2/MW2_AVG_DURATION/MW2_avg_duration_bin0.png";
var image_output_hist_avg_velocity = "MW2/MW2_AVG_VELOCITY/MW2_avg_velocity_bin0.png";
var image_output_hist_chroma_metric = "MW2/MW2_CHROMA/MW2_chroma_bin0.png";
var image_output_hist_chords_metric = "MW2/MW2_CHORDS/MW2_chords_bin0.png";


var original_page_width = 1920;
var original_page_height = 906;

var pad_image_1 = pad1_rc;
var pad_image_2 = pad2_nd;

var slider_1_bin = 1;
var slider_2_bin = 1;
var slider_3_bin = 1;
var slider_4_bin = 1;
var slider_5_bin = 1;
var slider_6_bin = 1;

var slider_1_num_of_bins = 19;
var slider_2_num_of_bins = 30;
var slider_3_num_of_bins = 111;
var slider_4_num_of_bins = 26;
var slider_5_num_of_bins = 30;
var slider_6_num_of_bins = 33;

var experiment_tag = 'MW2';


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
  <SwitchLabel_Pad1 onClick={() => onChange(title)} className={id} width={120 * current_width / original_page_width} lineheight={26 * current_height / original_page_height} fontsize={11 * current_width / original_page_width}>
    {titleCase_Pad1(title)}
  </SwitchLabel_Pad1>;

const ConcealedRadio_Pad1 = ({ value, selected }) =>
  <SwitchRadio_Pad1 type="radio" name="switch1" checked={selected === value} />;

class ToggleSwitch_Pad1 extends React.Component {
  state = { selected: this.props.selected };

  handleChange = val => {
    this.setState({ selected: val });
    if (val == 'Exag. Classical') {
      image_input_hist_pitch_count = "Earlier_pitch_count.png";
      image_input_hist_pitch_range = "Earlier_pitch_range2.png";
      image_input_hist_avg_duration = "Earlier_avg_duration.png";
      image_input_hist_avg_velocity = "Earlier_avg_velocity.png";
      image_input_hist_chroma_metric = "Earlier_chroma.png";
      image_input_hist_chords_metric = "Earlier_chords.png";
    }
    else if (val == 'Base') {
      image_input_hist_pitch_count = "Middle_pitch_count3.png";
      image_input_hist_pitch_range = "Middle_pitch_range3.png";
      image_input_hist_avg_duration = "Middle_avg_duration3.png";
      image_input_hist_avg_velocity = "Middle_avg_velocity.png";
      image_input_hist_chroma_metric = "Middle_chroma3.png";
      image_input_hist_chords_metric = "Middle_chords.png";
    }
    else if (val == 'Exag. 20th Century') {
      image_input_hist_pitch_count = "Later_pitch_count.png";
      image_input_hist_pitch_range = "Later_pitch_range3.png";
      image_input_hist_avg_duration = "Later_avg_duration.png";
      image_input_hist_avg_velocity = "Later_avg_velocity.png";
      image_input_hist_chroma_metric = "Later_chroma.png";
      image_input_hist_chords_metric = "Later_chords.png";
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
      <Switch_Pad1 width={360 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} top={340 * this.props.current_height / original_page_height} left={240 * this.props.current_width / original_page_width}>
        {this.props.values.map(val => {
          return (
            <span>
              <ConcealedRadio_Pad1 value={val} selected={selected} />
              <ClickableLabel_Pad1 title={val} onChange={this.handleChange} current_width={this.props.current_width} current_height={this.props.current_height} />
            </span>
          );
        })}
        <SwitchSelection_Pad1 style={this.selectionStyle_Pad1()} width={120 * this.props.current_width / original_page_width} height={26 * this.props.current_height / original_page_height} />
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
  // str.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  str.split('\n').map(function(item, key) {
    return (
      <span key={key}>
        {item}
        <br/>
      </span>
    )
  })

const ClickableLabel_Pad2 = ({ title, onChange, id, current_width, current_height }) =>
  <SwitchLabel_Pad2 onClick={() => onChange(title)} className={id} width={120 * current_width / original_page_width} lineheight={26 * current_height / original_page_height} fontsize={11 * current_width / original_page_width}>
    {titleCase_Pad2(title)}
  </SwitchLabel_Pad2>;

const ConcealedRadio_Pad2 = ({ value, selected }) =>
  <SwitchRadio_Pad2 type="radio" name="switch2" checked={selected === value} />;

class ToggleSwitch_Pad2 extends React.Component {
  state = { selected: this.props.selected };

  handleChange = val => {
    this.setState({ selected: val });
    if (val == 'Base \n Well Trained') {
      experiment_tag = 'MW2';
      slider_1_num_of_bins = 22;
      slider_2_num_of_bins = 25;
      slider_3_num_of_bins = 40;
      slider_4_num_of_bins = 24;
      slider_5_num_of_bins = 21;
      slider_6_num_of_bins = 25;
      
    }
    else if (val == 'Base \n Poorly Trained') {
      experiment_tag = 'MP2';
      slider_1_num_of_bins = 23;
      slider_2_num_of_bins = 32;
      slider_3_num_of_bins = 78;
      slider_4_num_of_bins = 27;
      slider_5_num_of_bins = 21;
      slider_6_num_of_bins = 29;
      
    }
    else if (val == 'Exag. Classical \n Well Trained') {
      experiment_tag = 'EW2';
      slider_1_num_of_bins = 19;
      slider_2_num_of_bins = 30;
      slider_3_num_of_bins = 18;
      slider_4_num_of_bins = 26;
      slider_5_num_of_bins = 30;
      slider_6_num_of_bins = 33;
      
    }
    else if (val == 'Exag. 20th Century \n Well Trained') {
      experiment_tag = 'LW2';
      slider_1_num_of_bins = 22;
      slider_2_num_of_bins = 25;
      slider_3_num_of_bins = 14; //109
      slider_4_num_of_bins = 20;
      slider_5_num_of_bins = 17;
      slider_6_num_of_bins = 34;
      
    }
    this.props.update2DFigures2();
  };

  selectionStyle_Pad2 = () => {
    return {
      left: `${this.props.values.indexOf(this.state.selected) / 4 * 100}%`,
    };
  };

  render() {
    const { selected } = this.state;
    return (
      <Switch_Pad2 width={480 * this.props.current_width / original_page_width} height={50 * this.props.current_height / original_page_height} top={425 * this.props.current_height / original_page_height} left={170 * this.props.current_width / original_page_width}>
        {this.props.values.map(val => {
          return (
            <span>
              <ConcealedRadio_Pad2 value={val} selected={selected} />
              <ClickableLabel_Pad2 title={val} onChange={this.handleChange} current_width={this.props.current_width} current_height={this.props.current_height} />
            </span>
          );
        })}
        <SwitchSelection_Pad2 style={this.selectionStyle_Pad2()} width={120 * this.props.current_width / original_page_width} height={50 * this.props.current_height / original_page_height} />
      </Switch_Pad2>
    );
  }
}

// ******************************* Pad2 Titles ************************************************************************

function TextPad2TrainingCorpus(props) {

  const text_title_style = {
    top: (415 * props.current_height / original_page_height) + 'px',
    left: (30 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_pad2trainingcorpus' style={text_title_style}> Training Corpus: </h1>
  );

};

function TextPad2TrainingLevel(props) {

  const text_title_style = {
    top: (440 * props.current_height / original_page_height) + 'px',
    left: (45 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_pad2traininglevel' style={text_title_style}> Training Level: </h1>
  );

};

function TextExperimentType(props) {

  const text_title_style = {
    top: (510 * props.current_height / original_page_height) + 'px',
    left: (23 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_experiment_type' style={text_title_style}> Experiment Type: </h1>
  );

};



// ******************************* General Material / Big Text / Headers **********************************************

function TextTitle(props) {

  const text_title_style = {
    top: (-20 * props.current_height / original_page_height) + 'px',
    left: (565 * props.current_width / original_page_width) + 'px',
    fontSize: (30 * props.current_width / original_page_width) + 'px',
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
    <h1 className='text_latent_values_label' style={text_latent_values_label_style}> Histograms of Training (Fine-tuning) Sets: </h1>
  );

};

function TextGeneratedSetStats(props) {

  const text_latent_values_label_style = {
    top: (550 * props.current_height / original_page_height) + 'px',
    left: (20 * props.current_width / original_page_width) + 'px',
    fontSize: (26 * props.current_width / original_page_width) + 'px',
  }

  return (
    <h1 className='text_latent_values_label' style={text_latent_values_label_style}> Histograms of Generated Sets: </h1>
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
    left: (845 * props.current_width / original_page_width) + 'px',
    fontSize: (26 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_output_variations' style={text_output_style}> Generated Sample Pianoroll: </h1>
  );

};

function TextOutputAudio(props) {

  const text_output_style = {
    top: (275 * props.current_height / original_page_height) + 'px',
    left: (1420 * props.current_width / original_page_width) + 'px',
    fontSize: (26 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <h1 className='text_output_audio' style={text_output_style}> Generated Sample Audio: </h1>
  );

};

function LineExperiments(props){
  return (
    <Svg height = {800} width={1820}>
      <Line x1={230 * props.current_width / original_page_width} y1={475 * props.current_height / original_page_height} x2={230 * props.current_width / original_page_width} y2={510 * props.current_height / original_page_height} stroke="grey" strokeWidth="3" />
      <Line x1={350 * props.current_width / original_page_width} y1={475 * props.current_height / original_page_height} x2={230 * props.current_width / original_page_width} y2={509 * props.current_height / original_page_height} stroke="grey" strokeWidth="3" />
      <Line x1={230 * props.current_width / original_page_width} y1={475 * props.current_height / original_page_height} x2={470 * props.current_width / original_page_width} y2={510 * props.current_height / original_page_height} stroke="grey" strokeWidth="3" />
      <Line x1={470 * props.current_width / original_page_width} y1={475 * props.current_height / original_page_height} x2={470 * props.current_width / original_page_width} y2={510 * props.current_height / original_page_height} stroke="grey" strokeWidth="3" />
      <Line x1={600 * props.current_width / original_page_width} y1={475 * props.current_height / original_page_height} x2={470 * props.current_width / original_page_width} y2={510 * props.current_height / original_page_height} stroke="grey" strokeWidth="3" />
      <Line x1={0 * props.current_width / original_page_width} y1={380 * props.current_height / original_page_height} x2={650 * props.current_width / original_page_width} y2={380 * props.current_height / original_page_height} stroke="grey" strokeWidth="3" />
    </Svg>
  )
};

function TextVaryingTrainingLevel(props) {

  const text_output_style = {
    top: (512 * props.current_height / original_page_height) + 'px',
    left: (180 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <center className='text_varying_training_level' style={text_output_style}> Varying <br/> Training Level </center>
  );

};

function TextVaryingTrainingCorpus(props) {

  const text_output_style = {
    top: (512 * props.current_height / original_page_height) + 'px',
    left: (410 * props.current_width / original_page_width) + 'px',
    fontSize: (16 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }

  return (
    <center className='text_varying_training_corpus' style={text_output_style}> Varying <br/> Training Corpus </center>
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/INPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
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
      <img src={`${process.env.PUBLIC_URL}/GEN_SEP_HISTOGRAMS_FOR_APP/OUTPUTS/` + props.name}width={220 * props.current_width / original_page_width} height={220 * props.current_height / original_page_height} />
    </div>
  );
};

// ***********************************************************************************


function TextInfo(props) {

  const text_signature_style = {
    top: (865 * props.current_height / original_page_height) + 'px',
    left: (20 * props.current_width / original_page_width) + 'px',
    font: (18 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  return (
    <h1 className='text_info' style={text_signature_style}> Berker Banar and Simon Colton </h1>
  );
};

function TextSignature(props) {

  const text_signature_style = {
    top: (865 * props.current_height / original_page_height) + 'px',
    left: (1700 * props.current_width / original_page_width) + 'px',
    font: (18 * props.current_width / original_page_width) + 'px Helvetica, Arial',
    fontWeight: 'bold',
  }

  return (
    <h1 className='text_signature' style={text_signature_style}> EvoMUSART 2022. </h1>
  );
};


// ********************************* Small Helper Texts ********************************************

function Pad1_2D_Display_Title(props) {
  const pad1_2d_display_title = {
    top: (290 * props.current_height / original_page_height) + 'px',
    left: (295 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }
  return (
    <h1 className='pad1_2d_display_title' style={pad1_2d_display_title}> Training (Fine-tuning) Set: </h1>
  );
}

function Pad2_2D_Display_Title(props) {
  const pad2_2d_display_title = {
    top: (375 * props.current_height / original_page_height) + 'px',
    left: (350 * props.current_width / original_page_width) + 'px',
    fontSize: (18 * props.current_width / original_page_width) + 'px',
    zIndex: '999'
  }
  return (
    <h1 className='pad2_2d_display_title' style={pad2_2d_display_title}> Generated Set: </h1>
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


// ************************************** Generated Music Pianoroll and Audio Material ****************************************
function ImageComponentGeneratedMusic(props) {
  const image_generated_music1_style = {
    top: (325 * props.current_height / original_page_height) + 'px',
    left: (650 * props.current_width / original_page_width) + 'px',
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

function Slider1 (props) {

  const [state, setState] = useState({ x: slider_1_bin });

  const slider1_text_style = {
  color: 'red',
  top: (833 * props.current_height / original_page_height) + 'px',
  left: (130 * props.current_width / original_page_width) + 'px',
  fontSize: (8 * props.current_width / original_page_width) + 'px',
  }

  return(
    <div className="slider1" style = {slider1_text_style}>
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => {setState(state => ({ ...state, x })); props.updateSlider1(); slider_1_bin = x}}
        xmin={1}
        xmax={slider_1_num_of_bins}
        color = {'red'}
        styles={{
          track: {
            backgroundColor: 'red',
            height: 7 * props.current_height / original_page_height,
            width: 171 * props.current_width / original_page_width
          },
          active: {
            backgroundColor: 'red'
          },
          thumb: {
            width: 20 * props.current_width / original_page_width,
            height: 20 * props.current_height / original_page_height,
            background: 'black'
          },
        }}
      />
      <h1 align = "center">Bin: {slider_1_bin}</h1>
    </div>       
  );
};

function Slider2 (props) {

  const [state, setState] = useState({ x: slider_2_bin });

  const slider2_text_style = {
  color: 'orange',
  top: (833 * props.current_height / original_page_height) + 'px',
  left: (430 * props.current_width / original_page_width) + 'px',
  fontSize: (8 * props.current_width / original_page_width) + 'px',
  }

  return(
    <div className="slider2" style = {slider2_text_style}>
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => {setState(state => ({ ...state, x })); props.updateSlider2(); slider_2_bin = x}}
        xmin={1}
        xmax={slider_2_num_of_bins}
        color = {'orange'}
        styles={{
          track: {
            backgroundColor: 'orange',
            height: 7 * props.current_height / original_page_height,
            width: 171 * props.current_width / original_page_width
          },
          active: {
            backgroundColor: 'orange'
          },
          thumb: {
            width: 20 * props.current_width / original_page_width,
            height: 20 * props.current_height / original_page_height,
            background: 'black'
          },
        }}
      />
      <h1 align = "center">Bin: {slider_2_bin}</h1>
    </div>       
  );
};

function Slider3 (props) {

  const [state, setState] = useState({ x: slider_3_bin });

  const slider3_text_style = {
  color: 'gold',
  top: (833 * props.current_height / original_page_height) + 'px',
  left: (730 * props.current_width / original_page_width) + 'px',
  fontSize: (8 * props.current_width / original_page_width) + 'px',
  }

  return(
    <div className="slider3" style = {slider3_text_style}>
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => {setState(state => ({ ...state, x })); props.updateSlider3(); slider_3_bin = x}}
        xmin={1}
        xmax={slider_3_num_of_bins}
        color = {'gold'}
        styles={{
          track: {
            backgroundColor: 'gold',
            height: 7 * props.current_height / original_page_height,
            width: 171 * props.current_width / original_page_width
          },
          active: {
            backgroundColor: 'gold'
          },
          thumb: {
            width: 20 * props.current_width / original_page_width,
            height: 20 * props.current_height / original_page_height,
            background: 'black'
          },
        }}
      />
      <h1 align = "center">Bin: {slider_3_bin}</h1>
    </div>       
  );
};

function Slider4 (props) {

  const [state, setState] = useState({ x: slider_4_bin });

  const slider4_text_style = {
  color: 'yellowgreen',
  top: (833 * props.current_height / original_page_height) + 'px',
  left: (1030 * props.current_width / original_page_width) + 'px',
  fontSize: (8 * props.current_width / original_page_width) + 'px',
  }

  return(
    <div className="slider4" style = {slider4_text_style}>
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => {setState(state => ({ ...state, x })); props.updateSlider4(); slider_4_bin = x}}
        xmin={1}
        xmax={slider_4_num_of_bins}
        color = {'yellowgreen'}
        styles={{
          track: {
            backgroundColor: 'yellowgreen',
            height: 7 * props.current_height / original_page_height,
            width: 171 * props.current_width / original_page_width
          },
          active: {
            backgroundColor: 'yellowgreen'
          },
          thumb: {
            width: 20 * props.current_width / original_page_width,
            height: 20 * props.current_height / original_page_height,
            background: 'black'
          },
        }}
      />
      <h1 align = "center">Bin: {slider_4_bin}</h1>
    </div>       
  );
};

function Slider5 (props) {

  const [state, setState] = useState({ x: slider_5_bin });

  const slider5_text_style = {
  color: 'mediumblue',
  top: (833 * props.current_height / original_page_height) + 'px',
  left: (1330 * props.current_width / original_page_width) + 'px',
  fontSize: (8 * props.current_width / original_page_width) + 'px',
  }

  return(
    <div className="slider5" style = {slider5_text_style}>
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => {setState(state => ({ ...state, x })); props.updateSlider5(); slider_5_bin = x}}
        xmin={1}
        xmax={slider_5_num_of_bins}
        color = {'mediumblue'}
        styles={{
          track: {
            backgroundColor: 'mediumblue',
            height: 7 * props.current_height / original_page_height,
            width: 171 * props.current_width / original_page_width
          },
          active: {
            backgroundColor: 'mediumblue'
          },
          thumb: {
            width: 20 * props.current_width / original_page_width,
            height: 20 * props.current_height / original_page_height,
            background: 'black'
          },
        }}
      />
      <h1 align = "center">Bin: {slider_5_bin}</h1>
    </div>       
  );
};

function Slider6 (props) {

  const [state, setState] = useState({ x: slider_6_bin });

  const slider6_text_style = {
  color: 'blueviolet',
  top: (833 * props.current_height / original_page_height) + 'px',
  left: (1630 * props.current_width / original_page_width) + 'px',
  fontSize: (8 * props.current_width / original_page_width) + 'px',
  }

  return(
    <div className="slider6" style = {slider6_text_style}>
      <Slider
        axis="x"
        x={state.x}
        onChange={({ x }) => {setState(state => ({ ...state, x })); props.updateSlider6(); slider_6_bin = x}}
        xmin={1}
        xmax={slider_6_num_of_bins}
        color = {'blueviolet'}
        styles={{
          track: {
            backgroundColor: 'blueviolet',
            height: 7 * props.current_height / original_page_height,
            width: 171 * props.current_width / original_page_width
          },
          active: {
            backgroundColor: 'blueviolet'
          },
          thumb: {
            width: 20 * props.current_width / original_page_width,
            height: 20 * props.current_height / original_page_height,
            background: 'black'
          },
        }}
      />
      <h1 align = "center">Bin: {slider_6_bin}</h1>
    </div>       
  );
};




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

    slider_1_bin_name: slider_1_bin,
    slider_2_bin_name: slider_2_bin,
    slider_3_bin_name: slider_3_bin,
    slider_4_bin_name: slider_4_bin,
    slider_5_bin_name: slider_5_bin,
    slider_6_bin_name: slider_6_bin,

    experiment_tag_name: experiment_tag,

    slider_1_num_of_bins_name: slider_1_num_of_bins,
    slider_2_num_of_bins_name: slider_2_num_of_bins,
    slider_3_num_of_bins_name: slider_3_num_of_bins,
    slider_4_num_of_bins_name: slider_4_num_of_bins,
    slider_5_num_of_bins_name: slider_5_num_of_bins,
    slider_6_num_of_bins_name: slider_6_num_of_bins,
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

    var input_pitch_count_histogram_filename = image_input_hist_pitch_count;
    var input_pitch_range_histogram_filename = image_input_hist_pitch_range;
    var input_avg_duration_histogram_filename = image_input_hist_avg_duration;
    var input_avg_velocity_histogram_filename = image_input_hist_avg_velocity;
    var input_chroma_metric_histogram_filename = image_input_hist_chroma_metric;
    var input_chords_metric_histogram_filename = image_input_hist_chords_metric;

    image_output_hist_pitch_count = experiment_tag + '/' + experiment_tag + "_PITCH_COUNT/" + experiment_tag + "_pitch_count_bin" + (slider_1_bin - 1) + ".png";
    image_output_hist_pitch_range = experiment_tag + '/' + experiment_tag + "_PITCH_RANGE/" + experiment_tag + "_pitch_range_bin" + (slider_2_bin - 1) + ".png";
    image_output_hist_avg_duration = experiment_tag + '/' + experiment_tag + "_AVG_DURATION/" + experiment_tag + "_avg_duration_bin" + (slider_3_bin - 1) + ".png";
    image_output_hist_avg_velocity = experiment_tag + '/' + experiment_tag + "_AVG_VELOCITY/" + experiment_tag + "_avg_velocity_bin" + (slider_4_bin - 1) + ".png";
    image_output_hist_chroma_metric = experiment_tag + '/' + experiment_tag + "_CHROMA/" + experiment_tag + "_chroma_bin" + (slider_5_bin - 1) + ".png";
    image_output_hist_chords_metric = experiment_tag + '/' + experiment_tag + "_CHORDS/" + experiment_tag + "_chords_bin" + (slider_6_bin - 1) + ".png";

    var output_pitch_count_histogram_filename = image_output_hist_pitch_count;
    var output_pitch_range_histogram_filename = image_output_hist_pitch_range;
    var output_avg_duration_histogram_filename = image_output_hist_avg_duration;
    var output_avg_velocity_histogram_filename = image_output_hist_avg_velocity;
    var output_chroma_metric_histogram_filename = image_output_hist_chroma_metric;
    var output_chords_metric_histogram_filename = image_output_hist_chords_metric;

    var slider_1_bin_filename = slider_1_bin;
    var slider_2_bin_filename = slider_2_bin;
    var slider_3_bin_filename = slider_3_bin;
    var slider_4_bin_filename = slider_4_bin;
    var slider_5_bin_filename = slider_5_bin;
    var slider_6_bin_filename = slider_6_bin;

    var experiment_tag_filename = experiment_tag;

    var slider_1_num_of_bins_filename = slider_1_num_of_bins;
    var slider_2_num_of_bins_filename = slider_2_num_of_bins;
    var slider_3_num_of_bins_filename = slider_3_num_of_bins;
    var slider_4_num_of_bins_filename = slider_4_num_of_bins;
    var slider_5_num_of_bins_filename = slider_5_num_of_bins;
    var slider_6_num_of_bins_filename = slider_6_num_of_bins;

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

    this.setState({slider_1_bin_name: slider_1_bin_filename});
    this.setState({slider_2_bin_name: slider_2_bin_filename});
    this.setState({slider_3_bin_name: slider_3_bin_filename});
    this.setState({slider_4_bin_name: slider_4_bin_filename});
    this.setState({slider_5_bin_name: slider_5_bin_filename});
    this.setState({slider_6_bin_name: slider_6_bin_filename});

    this.setState({experiment_tag_name: experiment_tag_filename});

    this.setState({slider_1_num_of_bins_name: slider_1_num_of_bins_filename});
    this.setState({slider_2_num_of_bins_name: slider_2_num_of_bins_filename});
    this.setState({slider_3_num_of_bins_name: slider_3_num_of_bins_filename});
    this.setState({slider_4_num_of_bins_name: slider_4_num_of_bins_filename});
    this.setState({slider_5_num_of_bins_name: slider_5_num_of_bins_filename});
    this.setState({slider_6_num_of_bins_name: slider_6_num_of_bins_filename});
  }


  render() {
    return (
      <div>

        <TextTitle current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextInputSetStats current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextGeneratedSetStats current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <ToggleSwitch_Pad1 update2DFigures1={this.doTheUpdate.bind(this)} values={['Exag. Classical', 'Base', 'Exag. 20th Century']} selected="Base" current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <ToggleSwitch_Pad2 update2DFigures2={this.doTheUpdate.bind(this)} values={['Base \n Well Trained', 'Base \n Poorly Trained', 'Exag. Classical \n Well Trained', 'Exag. 20th Century \n Well Trained']} selected={"Base \n Well Trained"} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        
        <TextExperimentType current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <LineExperiments current_height={this.state.windowHeight} current_width={this.state.windowWidth}/>

        <ImageComponentGeneratedMusic name={this.state.gen_pianoroll_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Audio_Player_Generated name={this.state.gen_mp3_file_name} current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <Pad1_2D_Display_Title current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <Pad2_2D_Display_Title current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <TextPad2TrainingCorpus current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextPad2TrainingLevel current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <TextVaryingTrainingLevel current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextVaryingTrainingCorpus current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

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
        <TextOutputAudio current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

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

        <TextInfo current_height={this.state.windowHeight} current_width={this.state.windowWidth} />
        <TextSignature current_height={this.state.windowHeight} current_width={this.state.windowWidth} />

        <Slider1 updateSlider1={this.doTheUpdate.bind(this)} current_height={this.state.windowHeight} current_width={this.state.windowWidth}/>
        <Slider2 updateSlider2={this.doTheUpdate.bind(this)} current_height={this.state.windowHeight} current_width={this.state.windowWidth}/>
        <Slider3 updateSlider3={this.doTheUpdate.bind(this)} current_height={this.state.windowHeight} current_width={this.state.windowWidth}/>
        <Slider4 updateSlider4={this.doTheUpdate.bind(this)} current_height={this.state.windowHeight} current_width={this.state.windowWidth}/>
        <Slider5 updateSlider5={this.doTheUpdate.bind(this)} current_height={this.state.windowHeight} current_width={this.state.windowWidth}/>
        <Slider6 updateSlider6={this.doTheUpdate.bind(this)} current_height={this.state.windowHeight} current_width={this.state.windowWidth}/>

        
        


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





