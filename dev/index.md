---
layout: summary
title: Development
extra-css: [/css/dev.css]
---

## _Pupil_

<p class="meta">09/2018 – current</p>

<video autoplay loop controls src="/downloads/pupil_demo.mp4" width="800"></video>

_Pupil_ was a semester-long project at the Entertainment Technology Center, about imagining AR experiences for classrooms in the future. You can check out our work on our [project homepage](https://www.etc.cmu.edu/projects/pupil/).

## _Metaballs_

<p class="meta">08/2018</p>

<video autoplay loop controls src="/downloads/metaballs_demo.mp4" width="800"></video>

This is a short real-time rendered sketch I made in Unity over the summer. I'll be making a write-up of my process making this shortly; in the meantime you can see a shortform version on [this twitter thread](https://twitter.com/YujinAriza/status/1005219247310565376).

## _Sand VR_

<p class="meta">01/2018 – 05/2018</p>

<img src="/img/2017-08-17-AK2A1383.JPG" />

_Sand VR_ was a semester-long independent study project that I worked on with [Anna Henson](https://www.annahenson.com/), about exploring tangible interfaces and relational experiences in virtual reality. Read the [blog post](/blog/2017/08/17/sand-vr) to find out more!

## _Music in Motion_

<p class="meta">01/2018 – 05/2018</p>

<iframe width="800" height="450" src="https://www.youtube.com/embed/au1gkM4lRRs?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

_Music in Motion_ was a semester-project at the Entertainment Technology Center, Carnegie Mellon University, about creating music in virtual reality using body movement. For this project, we required a fully procedural and spatial audio system, which would be fully controllable via the guests' body movements, which were tracked in Unity using the HTC Vive. As part of this project, I designed and implemented interactive instruments and audio processing chains in SuperCollider, which were then controlled from Unity, through OSC. In addition, I implemented a 12-speaker ambisonic sound setup, for use in conjunction with the virtual reality play space, and developed tools to quickly audition interaction mappings between Unity and SuperCollider.

[Project Homepage](https://www.etc.cmu.edu/projects/music-in-motion/)

## _Cracked Orlando_

<p class="meta">03/2017</p>

<video autoplay loop controls src="/downloads/orb_demo.mp4" width="800"></video>

I contributed interactive art for the Juilliard production of _Cracked Orlando_, a multimedia performance piece by composer Jonathan Dawe. I was responsible for two elements in the show: a rotating and evolving "orb" which was projected as a hologram and controlled by an array of proximity sensors; and a virtual avatar of the character Alcina, motion-tracked by Kinect and augmented with particle effects.

[Alcina Video Sample](/downloads/alcina_demo.mp4)  
[Orb Video Sample](/downloads/orb_demo.mp4)

## _Kaze (The Wind)_

<p class="meta">06/2016</p>

Mari Kimura, Liubo Borissov, Yujin Ariza

<iframe width="800" height="450" src="https://www.youtube.com/embed/B2LXcqC7U9U" frameborder="0" allowfullscreen></iframe>

I collaborated with violinist and composer Mari Kimura for her work, for violin, voice, string quartet, and interactive computer. I wrote code for the visual component of the piece, a representation of "wind" that flowed and morphed with the piece, using motion data tracked from specially made gloves worn by the performers. Max/MSP and Jitter were used for the live rendering of the particles.

[NewsBlaze: Mari Kimura’s “Kaze (The Wind)/Harmonic Constellations” Kicks up a Storm](http://newsblaze.com/entertainment/music/mari-kimuras-kaze-the-windharmonic-constellations-kicks-up-a-storm_60304/)

## _Fluid_

<p class="meta">12/2015</p>

<iframe width="800" height="450" src="https://www.youtube.com/embed/BmHt5eSwW_A" frameborder="0" allowfullscreen></iframe>

Fluid is an audiovisual piece that I created. The piece was made using Ableton Live + Max, so that the visuals (built in Max's Jitter) can react to the MIDI and control parameters being sent through Ableton. Read more about the project and its technical challenges in a blog post I wrote [here](/blog/2015/12/23/postmortem-fluid/).

## _Vango_ – Painterly Representations of Images

<p class="meta">10/2015</p>

<p class="meta">Yujin Ariza, Eszter Offertaler</p>

<video autoplay loop src="/downloads/columbia2_textured.mp4" width="800" controls></video>

We convert photographs of scenery into painting representations. After analysis of the image, a "canvas" file is outputted by the program, given a specific "style" file for _vango_ to paint in. After this, the painting can be rendered in either a textured or untextured format.

This project was written in C++, and uses the OpenCV framework.

[Github repo](http://github.com/yariza/vango)  

## _Rainborg_ – Position-based Fluid Simulation

<p class="meta">05/2015</p>

<p class="meta">Yujin Ariza, Eszter Offertaler</p>

<video autoplay loop src="/downloads/rainborg.mp4" width="800" controls></video>

We implemented a GPU-accelerated position-based fluid simulation, based on the paper by [Miles Macklin, and Matthaias Muller](http://mmacklin.com/pbf_sig_preprint.pdf). The program is capable of simulating and rendering the output at realtime speeds, for a number of particles up to 30,000.

This project was written in CUDA C/C++.

[Github repo](http://github.com/yariza/rainborg)  
