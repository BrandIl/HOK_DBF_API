
import ProgramReader from './program.reader';
import CustomerReader from './customer.reader'
import ProjectReader from '../organization/project.reader';
export default class ProgramService {

    constructor(organizationKey) {
        this.ProgramReader = new ProgramReader(organizationKey);
        this.CustomerReader = new CustomerReader(organizationKey);
        this.ProjectReader = new ProjectReader(organizationKey);


    }

    getPrograms() {
        const getProgramsPromise = this.ProgramReader.getPrograms();
        const getCustomerPromise = this.CustomerReader.getCustomers();
        const getProjectPromise = this.ProjectReader.getProjects();
        return Promise.all([getProgramsPromise, getCustomerPromise, getProjectPromise])
            .then(([programs, customers, projects]) => {
                return programs.map(prg => {
                    const customer = customers.find(csmr => csmr.key == prg.customerKey);
                    const project = projects.find(prj => prj.key == prg.projectKey);
                    return Object.assign({}, prg, { customer }, { project });
                })
            })
    }

}