
import OrganizationReader from './organization.reader';
import ProjectReader from './project.reader';
export default class OrganizationService {

    constructor() {
        this.OrganizationReader = new OrganizationReader();

    }

    getOrganizations() {
        return this.OrganizationReader.getOrganizations();
    }

    getOrganization(key) {
        const getProjectPromise = new ProjectReader(key).getProjects();
        const getOrganizationPromise = this.OrganizationReader.getOrganization(key);
        return Promise.all([getOrganizationPromise, getProjectPromise])
            .then(([org, projects]) => Object.assign({}, org, { projects }));
    }

    getProjects(key) {
        return new ProjectReader(key).getProjects()
    }
}