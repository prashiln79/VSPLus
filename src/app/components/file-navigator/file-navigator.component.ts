import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { updatedBranchTreeUrl, updatedBranchURL, updatedFileList, updateSubFileList } from 'src/app/action/branch-details.actions';
import { State } from 'src/app/reducers';




/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    name: string;
    children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
    {
        name: 'src',
        children: [
            { name: 'app.component.ts' },
            { name: 'app.component.html' },
            { name: 'app-routing.module.ts' },
        ]
    }, {
        name: 'app',
        children: [
            {
                name: 'assets',
                children: [
                    { name: 'Broccoli' },
                    { name: 'Brussels sprouts' },
                ]
            }, {
                name: 'environments',
                children: [
                    { name: 'Pumpkins' },
                    { name: 'Carrots' },
                ]
            },
        ]
    },
];

/**
 * @title Tree with nested nodes
 */

@Component({
    selector: 'app-file-navigator',
    templateUrl: './file-navigator.component.html',
    styleUrls: ['./file-navigator.component.scss']
})
export class FileNavigatorComponent implements OnInit {

    public url: string = 'https://github.com/prashiln79/TAU';
    treeControl = new NestedTreeControl<FoodNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<FoodNode>();
    fileStructList: any = [];
    URL: String = '';
    pathList: Array<any> = [];

    constructor(public httpClient: HttpClient, private store: Store<State>) {
    }

    hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

    ngOnInit(): void {
        this.URL = 'https://api.github.com/repos/prashiln79/TAU';
        this.store.dispatch(updatedBranchURL({ url: this.URL }));
        this.getBranchTreeUrl();
      //  this.getBranchTree();
        this.getFileStructList();




        let data = [
            {
                "name": ".browserslistrc",
                "url": 'test'
            },
            {
                "name": ".editorconfig"
            },
            {
                "name": ".gitignore"
            },
            {
                "name": "LICENSE"
            },
            {
                "name": "README.md"
            },
            {
                "name": "angular.json"
            },
            {
                "name": "e2e",
                "children": [
                    {
                        "name": "protractor.conf.js"
                    },
                    {
                        "name": "src",
                        "children": [
                            {
                                "name": "app.e2e-spec.ts"
                            },
                            {
                                "name": "app.po.ts"
                            }
                        ]
                    },
                    {
                        "name": "tsconfig.json"
                    }
                ]
            },
            {
                "name": "karma.conf.js"
            },
            {
                "name": "package-lock.json"
            },
            {
                "name": "package.json"
            },
            {
                "name": "src",
                "children": [
                    {
                        "name": "app",
                        "children": [
                            {
                                "name": "app-routing.module.ts"
                            },
                            {
                                "name": "app.component.html"
                            },
                            {
                                "name": "app.component.scss"
                            },
                            {
                                "name": "app.component.spec.ts"
                            },
                            {
                                "name": "app.component.ts"
                            },
                            {
                                "name": "app.module.ts"
                            }
                        ]
                    },
                    {
                        "name": "assets",
                        "children": [
                            {
                                "name": ".gitkeep"
                            }
                        ]
                    },
                    {
                        "name": "environments",
                        "children": [
                            {
                                "name": "environment.prod.ts"
                            },
                            {
                                "name": "environment.ts"
                            }
                        ]
                    },
                    {
                        "name": "favicon.ico"
                    },
                    {
                        "name": "index.html"
                    },
                    {
                        "name": "main.ts"
                    },
                    {
                        "name": "polyfills.ts"
                    },
                    {
                        "name": "styles.scss"
                    },
                    {
                        "name": "test.ts"
                    }
                ]
            },
            {
                "name": "tsconfig.app.json"
            },
            {
                "name": "tsconfig.json"
            },
            {
                "name": "tsconfig.spec.json"
            },
            {
                "name": "tslint.json"
            }
        ]

        data.sort((a, b) => {

            if (a.children && b.children) {
                return 0;
            } else if (a.children) {
                return -1;
            } else if (b.children) {
                return 1;
            } else {
                return 0;
            }
        });

        this.dataSource.data = data;
    }


    // getFileTree(url: string, array: any, children: boolean) {

    //     this.httpClient.get(url).subscribe((data: any) => {
    //         if (data && data.tree) {
    //             data.tree.forEach((element: any, index: any) => {
    //                 array.push({ 'name': element.path });
    //                 if (element.type == "tree") {
    //                     this.getFileTree(element.url, [Object.assign(array[index], { children: [] })], true);
    //                 }
    //             });

    //         }
    //         this.store.dispatch(updatedBranchFileList(this.tree));

    //     });

    // }

    search() {
        console.log(this.url)
    }



    getBranchTreeUrl() {
        this.store.select(state => (state.branchDetails.commits))
            .subscribe((data: any) => {
                if (data && data[0] && data[0].sha) {
                    this.store.dispatch(updatedBranchTreeUrl({ url: this.URL + '/git/trees/' + data[0].sha }));
                }
            });
    }

    // getBranchTree() {
    //     this.store.select(state => (state.branchDetails.tree))
    //         .subscribe((data: Array<any>) => {
    //             if (data && data.length > 1) {
    //                 this.store.dispatch(updatedFileList(data));
    //             }
    //         });
    // }


    checkIfsubTreeIsPresent(tree: Array<any>) {
        let checkSubTree = false;
        tree.forEach((items, index) => {
            if (items.type == 'tree') {
                checkSubTree = true;
                if(this.pathList.indexOf(items.path) == -1){
                    this.pathList.push(items.path);
                    this.store.dispatch(updateSubFileList({ url: items.url,path:items.path }));
                }
            }
            
        });
        if(!checkSubTree){
            this.addFileListToTree(tree);
        }
    }

    addFileListToTree(tree:Array<any>){
        let finalTree =[];
        for(let i of tree){
            if(i.path.indexOf('/')== -1){
                finalTree.push([{name:i.path}])
            }else{ //e2e/src/app.e2e-spec.ts
                // let path = i.path.split('/');
                // let pathObj = finalTree;
                // for(let i =0;i<=path.length;i++){
                //     pathObj[path[i]] = {'childer':''};
                //     pathObj[path[i]] = pathObj[path[i]]
                }
            }
        }
    }

    getFileStructList(){
        this.store.select(state => (state.branchDetails.filesList))
            .subscribe((data: Array<any>) => {
                if (data && data.length > 1) {
                    this.fileStructList = data
                    this.checkIfsubTreeIsPresent(data);
                }
            });
    }

}
