const axios = require("axios");

//
// Get the package file for a particular npm package.
//
async function getPackageData(packageName) {
    const encodedPackageName = encodeURIComponent(packageName);
    const registry = "https://registry.npmjs.com";
    const url = `${registry}/${encodedPackageName}`;
    const response = await axios.get(url);
    return response.data;
}

//
// Get available versions for a particular npm package.
//
async function getAvailableVersions(packageName) {
    const packageData = await getPackageData(packageName);
    return Object.keys(packageData.versions);
}

//
// Get package data for the latest version.
//
async function getLatestVersionPackageData(packageName) {
    const packageData = await getPackageData(packageName);
    const versions = Object.keys(packageData.versions);
    const latestVersion = versions[versions.length-1];
    return packageData.versions[latestVersion];
}

//
// Get peer dependencies for the particular package.
//
async function getPeerDependencies(packageName) {
    const peerDeps = (await getLatestVersionPackageData(packageName)).peerDependencies;
    return Object.keys(peerDeps);
}

async function main() {
    const packageName = "data-forge-indicators";
    const packageData = await getPackageData(packageName);
    console.log("Package " + packageName);
    console.log("Got package data:");
    console.log(packageData.data);

    const versions = await getAvailableVersions(packageName);
    console.log(versions);

    console.log("Latest version:");
    const latestVersionPackageData = await getLatestVersionPackageData(packageName);
    console.log(latestVersionPackageData); 

    console.log("Peer deps:");
    const peerDeps = await getPeerDependencies(packageName);
    console.log(peerDeps);
}

main()
    .then(() => console.log("Done"))
    .catch(err => {
        console.error("Failed");
        console.error(err && err.stack || err);
    });