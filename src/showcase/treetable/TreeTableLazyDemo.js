import React, { Component } from 'react';
import { TreeTable } from '../../components/treetable/TreeTable';
import { Column } from "../../components/column/Column";
import { TreeTableSubmenu } from '../../showcase/treetable/TreeTableSubmenu';
import { TabView, TabPanel } from '../../components/tabview/TabView';
import { CodeHighlight } from '../codehighlight/CodeHighlight';

export class TreeTableLazyDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            first: 0,
            rows: 10,
            totalRecords: 0,
            loading: true
        };

        this.onPage = this.onPage.bind(this);
        this.onExpand = this.onExpand.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
                nodes: this.loadNodes(this.state.first, this.state.first + this.state.rows),
                totalRecords: 1000
            });
        }, 1000);
    }

    loadNodes(start, end) {
        let nodes = [];

        for(let i = start; i < end; i++) {
            let node = {
                key: i,
                data: { 
                    name: 'Item ' + (start + i),
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + (start + i)
                },
                leaf: false
            };

            nodes.push(node);
        }
        
        return nodes;
    }

    onExpand(event) {
        if (!event.node.children) {
            this.setState({
                loading: true
            });
            
            setTimeout(() => {
                this.loading = false;
                let lazyNode = {...event.node};
    
                lazyNode.children = [
                    {
                        data: { 
                            name: lazyNode.data.name + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'File'
                        },
                    },
                    {
                        data: {
                            name: lazyNode.data.name + ' - 1',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'File'
                        }
                    }
                ];

                let nodes = [...this.state.nodes];
                nodes[event.node.key] = lazyNode;
    
                this.setState({
                    loading: false,
                    nodes: nodes
                });
            }, 250);
        }
    }

    onPage(event) {
        this.setState({
            loading: true
        });

        //imitate delay of a backend call
        setTimeout(() => {    
            this.setState({
                first: event.first,
                rows: event.rows,
                nodes: this.loadNodes(event.first, event.first + event.rows),
                loading: false
            });
        }, 1000);
    }

    render() {
        return (
            <div>
                <TreeTableSubmenu />

                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>TreeTable - Lazy</h1>
                        <p>Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime paging or sorting. 
                            In addition, children of a node can be loaded on demand at onNodeExpand event as well. Sample belows imitates lazy paging by using an in memory list.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <TreeTable value={this.state.nodes} lazy={true} paginator={true} totalRecords={this.state.totalRecords}
                        first={this.state.first} rows={this.state.rows} onPage={this.onPage} onExpand={this.onExpand} loading={this.state.loading}>
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>
                </div>

                <TreeTableLazyDemoDoc />
            </div>
        )
    }
}

class TreeTableLazyDemoDoc extends Component {

    shouldComponentUpdate(){
        return false;
    }
    
    render() {
        return (
            <div className="content-section documentation">
                <TabView>
                    <TabPanel header="Source">
<CodeHighlight className="language-javascript">
{`
import React, { Component } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";

export class TreeTableLazyDemo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            first: 0,
            rows: 10,
            totalRecords: 0,
            loading: true
        };

        this.onPage = this.onPage.bind(this);
        this.onExpand = this.onExpand.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
                nodes: this.loadNodes(this.state.first, this.state.first + this.state.rows),
                totalRecords: 1000
            });
        }, 1000);
    }

    loadNodes(start, end) {
        let nodes = [];

        for(let i = start; i < end; i++) {
            let node = {
                key: i,
                data: { 
                    name: 'Item ' + (start + i),
                    size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                    type: 'Type ' + (start + i)
                },
                leaf: false
            };

            nodes.push(node);
        }
        
        return nodes;
    }

    onExpand(event) {
        if (!event.node.children) {
            this.setState({
                loading: true
            });
            
            setTimeout(() => {
                this.loading = false;
                let lazyNode = {...event.node};
    
                lazyNode.children = [
                    {
                        data: { 
                            name: lazyNode.data.name + ' - 0',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'File'
                        },
                    },
                    {
                        data: {
                            name: lazyNode.data.name + ' - 1',
                            size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                            type: 'File'
                        }
                    }
                ];

                let nodes = [...this.state.nodes];
                nodes[event.node.key] = lazyNode;
    
                this.setState({
                    loading: false,
                    nodes: nodes
                });
            }, 250);
        }
    }

    onPage(event) {
        this.setState({
            loading: true
        });

        //imitate delay of a backend call
        setTimeout(() => {    
            this.setState({
                first: event.first,
                rows: event.rows,
                nodes: this.loadNodes(event.first, event.first + event.rows),
                loading: false
            });
        }, 1000);
    }

    render() {
        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>TreeTable - Lazy</h1>
                        <p>Lazy mode is handy to deal with large datasets, instead of loading the entire data, small chunks of data is loaded by invoking corresponding callbacks everytime paging or sorting. 
                            In addition, children of a node can be loaded on demand at onNodeExpand event as well. Sample belows imitates lazy paging by using an in memory list.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <TreeTable value={this.state.nodes} lazy={true} paginator={true} totalRecords={this.state.totalRecords}
                        first={this.state.first} rows={this.state.rows} onPage={this.onPage} onExpand={this.onExpand} loading={this.state.loading}>
                        <Column field="name" header="Name" expander></Column>
                        <Column field="size" header="Size"></Column>
                        <Column field="type" header="Type"></Column>
                    </TreeTable>
                </div>
            </div>
        )
    }
}

`}
</CodeHighlight>
                    </TabPanel>
                </TabView>
            </div>
        )
    }
}