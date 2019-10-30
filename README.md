# newrelic-vr

## It's not actually VR!

I have disabled VR for now because it's not working properly in the latest version of Aframe (9.2.0). You can still use the gyro on your phone, just no goggles for now.

## What am I seeing?

This project can fetch some Kubernetes data from New Relic Insights and represent it in a 3D way, think of it as the Cluster explorers' fun 3D brother.
The first 5 clusters in your account will be displayed as large container ships where every container on the ships represents a node in that cluster.
Every ship has a tooltip indicating basic info like number of nodes, pods and violations, the ships also start smoking when there are critical violations on the pods.
Clicking on a ship will focus on it allowing you to see individual node names and pod counts.

## Lessons learned

Aframe reads the dom and builds a scene from it so I thought about using React for this as it has an `aframe-react` wrapper library specifically made for this,
but it did not work well for me. I also started out with TypeScript but found that I had to do too much casting in Three.js so ended up dropping that too.

This version is built using Vue.js and I'm quite happy with the outcome. I still prefer JSX over templates but everything worked very well for a first attempt at using Vue.

## Used technologies

- [Aframe](https://aframe.io/)
- [Vue.js](https://vuejs.org/)

- Blender

## Development

### Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
