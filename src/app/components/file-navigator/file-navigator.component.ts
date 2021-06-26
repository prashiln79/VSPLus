import { NestedTreeControl } from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { updatedBranchTreeUrl, updatedBranchURL, updateSubFileList } from 'src/app/action/branch-details.actions';
import { State } from 'src/app/reducers';
import { MatSnackBar } from '@angular/material/snack-bar';


interface FoodNode {
    name: string;
    children?: FoodNode[];
}

@Component({
    selector: 'app-file-navigator',
    templateUrl: './file-navigator.component.html',
    styleUrls: ['./file-navigator.component.scss']
})
export class FileNavigatorComponent implements OnInit {

    public url: string = '';
    public apiUrl = '';
    treeControl = new NestedTreeControl<FoodNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<FoodNode>();
    fileStructList: any = [];
    pathList: Array<any> = [];
    position: number = 0;

    constructor(public httpClient: HttpClient, private store: Store<State>, private _snackBar: MatSnackBar) {
    }

    hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

    ngOnInit(): void {
        this.getBranchTreeUrl();
        this.getFileStructList();

        let demoData = [
            {
                "name": ".browserslistrc",
                "url":'test'
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
        ];
        
        this.dataSource.data = this.sortFiles(demoData);
    }


    search() {
        this.apiUrl = '';
        try {
            let user = (this.url.split('github.com/')[1]).split('/')[0];
            let repository = (this.url.split('github.com/')[1]).split('/')[1];
            this.apiUrl = 'https://api.github.com/repos/' + user + '/' + repository;
            if (repository && user) {
                this.store.dispatch(updatedBranchURL({ url: this.apiUrl }));
            }
            else {
                throw 'error'
            }

        } catch (e) {
            this._snackBar.open('Invalid URL', 'close');
            this.apiUrl = '';
        }

    }

    getBranchTreeUrl() {
        this.store.select(state => (state.branchDetails.commits))
            .subscribe((data: any) => {
                if (data && data[0] && data[0].sha) {
                    this.store.dispatch(updatedBranchTreeUrl({ url: this.apiUrl + '/git/trees/' + data[0].sha }));
                }
            });
    }



    checkIfsubTreeIsPresent(tree: Array<any>) {
        let checkSubTree = false;
        tree.forEach((items, index) => {
            if (items.type == 'tree') {
                checkSubTree = true;
                if (this.pathList.indexOf(items.path) == -1) {
                    this.pathList.push(items.path);
                    this.store.dispatch(updateSubFileList({ url: items.url, path: items.path }));
                }
            }

        });
        if (!checkSubTree) {
            this.addFileListToTree(tree);
        }
    }

    addFileListToTree(tree: Array<any>) {
        let finalTree: any = [];
        let subtree = [];
        for (let i in tree) {
            this.position = 0;
            if (tree[i].path.indexOf('/') > -1) {

                this.addFile(tree[i].path, finalTree);
            } else {
                finalTree.push({ 'name': tree[i].path });
            }

        }
     

        this.dataSource.data = this.sortFiles(finalTree);

    }

    sortFiles(list:any){
        list.sort((a: any, b: any) => {

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
        return list;
    }

    addFile(path: String, finalTree: any) {

        let Object: any;
        if (path.indexOf('/') > -1) {
            this.position = 0
            if (path.split('/').length > 1) {
                Object = this.getPathObject(path.slice(0, path.lastIndexOf('/')), finalTree)
            } else {
                Object = finalTree;
            }
        }
        else {
            return path;
        }

        if (path.indexOf('/') > -1) {
            if (Object && Object['children'] && path.split('/').length <= 2) {
                Object['children'].push({ name: path.slice(path.indexOf('/') + 1) });
            }
            else if (Object && Object['children'] && ((path.split('/').length - this.position) == 2)) {
                Object['children'].push({ name: path.slice(path.lastIndexOf('/') + 1) });
            }
            else if (Object && Object['children'] && path.split('/').length > 2) {
                this.addFile(path.slice(path.split('/')[this.position].length + 1), Object);
            }
            else if (Object && path.split('/').length >= 2) {
                Object.push({ name: path.split('/')[this.position], children: [] });
                this.addFile(path.slice(path.split('/')[this.position].length + 1), Object);
            }
            else {
                finalTree.push({ name: path.slice(0, path.indexOf('/')), children: [{ name: this.addFile(path.slice(path.indexOf('/') + 1), finalTree) }] })
            }
        }
        return
    }

    getPathObject(path: any, finalTree: any) {
        let data = path.split('/')
        let i = 0;
        let obj: any = finalTree;
        while (i < (data.length)) {
            if (obj && obj.name) {
                this.position++;
                obj = this.getPathObject(data[i], obj.children);

            } else {

                obj = finalTree.find((elem: any) => {

                    if (elem.name == data[i]) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
            i++;
        }
        return obj || finalTree;

    }


    getFileStructList() {
        this.store.select(state => (state.branchDetails.filesList))
            .subscribe((data: Array<any>) => {
                if (data && data.length > 1) {
                    this.fileStructList = data
                    this.checkIfsubTreeIsPresent(data);
                }
            });
        this.checkTreeFailur();
    }

    checkTreeFailur() {
        this.store.select(state => (state.branchDetails.subBranchRetrievalFailure))
            .subscribe((data: any) => {
                if(data){
                    this._snackBar.open('Fail to load files', 'close');
                    this.addFileListToTree(this.fileStructList);
                }
            });
    }

}
