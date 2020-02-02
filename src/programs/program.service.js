
import ProgramReader from './program.reader';
import CustomerReader from './customer.reader'
import ProjectReader from '../organization/project.reader';
export default class ProgramService {

    constructor(organizationKey) {
        this.ProgramReader = new ProgramReader(organizationKey);
        this.CustomerReader = new CustomerReader(organizationKey);
        this.ProjectReader = new ProjectReader(organizationKey);


    }

    async getPrograms() {
        const programs = await this.ProgramReader.getPrograms();

        const customers = await this.CustomerReader.getCustomers();
        const _customers = customers.reduce((obj, cst) => {
            obj[cst.key] = cst;
            return obj;
        }, {});

        const projects = await this.ProjectReader.getProjects();
        const _projects = projects.reduce((obj, prj) => {
            obj[prj.key] = prj;
            return obj;
        }, {});

        return programs.map(prg => {
            const customer = _customers[prg.customerKey];
            const project = _projects[prg.projectKey];
            return Object.assign({}, prg, { customer }, { project });
        })
    }

}