// These are real NRQL results.
// Build your own proxy and hooking it up to this api class should be fairly straight forward.

// from K8sPodSample select latest(clusterName), latest(nodeName),
// filter(uniqueCount(entityName), where status != 'Pending'),
// filter(uniqueCount(entityName), where status = 'Pending'),
// average(warningViolationCount OR 0), average(criticalViolationCount OR 0)
// facet clusterName, nodeName since 3 minutes ago until 2 minutes ago limit max
import nodes from "./mock/k8sPodSample.json";

// Extend this class to implement your own api.
export default class Api {
  constructor() {
    this.error = name => {
      throw new Error(
        `${this.constructor.name} does not implement required method ${name}`
      );
    };
  }

  async getClusters() {
    this.error("getClusters");
  }
}

class MockApi extends Api {
  async getClusters() {
    const clusters = new Map();
    for (let node of nodes.facets) {
      const [
        clusterName,
        nodeName,
        pods,
        pendingPods,
        warningPercent,
        criticalPercent
      ] = node.results.map(result => Object.values(result)[0]);
      const cluster = clusters.get(clusterName) || {
        name: clusterName,
        pods: 0,
        pendingPods: 0,
        warningCount: 0,
        criticalCount: 0,
        nodes: []
      };

      if (nodeName) {
        const warningCount = warningPercent * (pods + pendingPods);
        const criticalCount = criticalPercent * (pods + pendingPods);
        cluster.nodes.push({
          name: nodeName,
          pods,
          warningCount,
          criticalCount
        });
        cluster.pods += pods;
        cluster.pendingPods += pendingPods;
        cluster.warningCount += warningCount;
        cluster.criticalCount += criticalCount;
      } else {
        cluster.pendingPods += pendingPods;
        cluster.warningCount += warningPercent * (pods + pendingPods);
        cluster.criticalCount += criticalPercent * (pods + pendingPods);
      }

      clusters.set(clusterName, cluster);
    }

    return Promise.resolve([...clusters.values()].slice(-5));
  }
}

export const mockApi = new MockApi();
