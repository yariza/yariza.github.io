---
layout: post
title: "three realities"
date: 2019-05-13 16:12:17
tags: vr oculus zed leap-motion
---

<iframe width="800" height="450" src="https://www.youtube.com/embed/4NcDrDnEAWE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_three realities_ is a AR/VR experience that explores the boundary between the virtual and the real.

Following the [Pupil](https://www.etc.cmu.edu/projects/pupil/) project, I was interested in seeing more of what passthrough VR could enable in AR/VR experiences. The hybrid platform we used – an Oculus Rift mounted with a ZED Mini stereo camera and a Leap Motion hand tracker, was particularly interesting to me because unlike in conventional lens-based AR, we could occlude and warp reality because reality essentially became pixels in your screen.

![](/img/2019-05-13-oculus-zed-leap.png "A VR headset (here, the Oculus Rift) + the ZED mini stereo camera + Leap Motion controller")

Early demos illustrating these reality-bending affordances showed promise; I decided to spend my semester to create more of these prototypes, planning to eventually form them into a cohesive experience.

<video src="/downloads/2019-05-13-wave_table_demo.mp4" autoplay loop muted></video>

To begin, I first experimented with primarily image filter-based effects, using the depth information from the camera to visualize the world. These were compelling in the sense that they became different "lenses" in which to view the world; however, they were limited in terms of interactivity in the world.

<video src="/downloads/2019-05-13-sonar_demo.mp4" autoplay loop muted></video>

<video src="/downloads/2019-05-13-grid_wireframe.mp4" autoplay loop muted></video>

Changing the physical characteristics of materials was a point of interest going into the project. I imagined a world in which you could stretchy real objects as if they were made of rubber, and watch them oscillate back into shape when released.

<video src="/downloads/2019-05-13-monitor_stretch_demo.mp4" autoplay loop muted></video>

The result — stretchy world — was perhaps the experience that yielded the most reactions from playtesters. One observation was that partipants enjoyed stretching others' faces — it took on a more social element as people watched themselves being stretched on the monitor screen.

Figuring out the role of interaction was a challenge when creating these worlds. While stretchy world used pinch and drag to interact with real objects, the lack of tactility in the things that you were virtually stretching meant that I couldn't go too far with respect to seamlessly mixing the virtual and the real; the lack of haptics on virtual objects would give them away as not existing in the real world. With this in mind, I started exploring gaze as a primary mode of interaction.

<video src="/downloads/2019-05-13-gaze-particles.mp4" autoplay loop muted></video>

In this world, your gaze revealed objects in the form of particles. Since the particles persisted, this also meant that you could leave trails behind by moving your hands in the space.

I used a variant of this world in the final experience, in which the area around your hand would appear as particles, allowing you to "see" the world by feeling with your hands.

<video src="/downloads/2019-05-13-hand_particles.mp4" autoplay loop muted></video>

Because I wanted the worlds to cohesively flow in the final experience, I worked on a way to transition between worlds. Using portals was a compelling idea, as it was a seamless way to transition in VR as compared to crossfading or a fade to black. As a reference, I followed Freya Holmer's [fantastic talk](https://www.youtube.com/watch?v=f786ak3GKQo) on the portal locomotion in _Budget Cuts_ to implement my version of the effect.

<video src="/downloads/2019-05-13-space_portal.mp4" autoplay loop muted></video>

An early version of the portal using a placeholder cubemap demonstrated the feasibility of the effect; however, it was a significant technical challenge to transition between two live worlds, and to convert my existing worlds to support the portal effect.

<video src="/downloads/2019-05-13-portal_transition.mp4" autoplay loop muted></video>

Finding an overarching theme for the work as a whole was an overall difficulty. Admittedly the “why” of this project didn’t culminate until late in the project, and some prototypes didn’t mature out of the stages of a tech demo to become meaningful experiences. For the final experience, I picked three worlds which I thought could stand on their own and would form an emotional flow to the piece, and strung them together using the portal as a transition.

_three realities_ is available on [GitHub](https://github.com/yariza/three-realities/).
