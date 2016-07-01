class Octicons {
  static branch() {
    return (<span className="octicon octicon-git-branch"></span>);
  }
            
  static repo() {
    return (<span className="octicon octicon-repo"></span>);
  }    

  static file() {
    return (<span className="octicon octicon-file-code"></span>);
  }       
            
  static commit() {
    return (<span className="octicon octicon-git-commit"></span>);
  }   
            
  static plus() {
    return (<span className="octicon octicon-plus"></span>);
  }    
            
  static pencil() {
    return (<span className="octicon octicon-pencil"></span>);
  }               
}

    this.get("list", callback);
    this.post("create", callback, data);
      
  static editRepository(data, callback) {
    this.put("edit", callback, data);
  }      
    this.get("branches/" + repoName, callback);    
    this.get("tree/" + repoName + "/" + branch, callback);
    this.get("commits/" + repoName + "/" + branch, callback);
    const url = "blob/" + repoName + "/" + branch + "/" + filename;
      
  static readBlobSHA1(sha1, callback) {
    const url = "blob/" + sha1;
    this.get(url, callback, false);
  }      
    const url = "commit/" + sha1;
      
  static put(folder, callback, data) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", (evt) => { handleError(evt, callback, false); });
    oReq.open("PUT", this.root + folder);
    oReq.send(JSON.stringify(data));
  }      
    return (
      <div>
      <hr />
      <table>
      <tr>
      <td>Key:</td>
      <td><Link to={this.props.params.repo + "/commit/" + e.SHA1}>{e.SHA1}</Link></td>
      </tr>
      <tr>
      <td>Name:</td>
      <td>{e.COMMITTER.NAME}</td>
      </tr>
      <tr>
      <td>Description:</td>
      <td>{e.TEXT}</td>
      </tr>
      <tr>
      <td>Time:</td>
      <td>{ago}</td>
      </tr>
      </table>
      </div>);
class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {description: "", spinner: true };

    REST.listRepositories(this.update.bind(this));      
  }

  update(d) {
    for (let repo of d) {
      if (repo.NAME === this.props.params.repo) {
        this.setState({description: repo.DESCRIPTION, spinner: false});        
      }
    }
  }        

  callback(d) {
    this.setState({done: true});
  }
    
  click(e) {
    REST.editRepository(
      {name: this.props.params.repo, description: this.state.description}, 
      this.callback.bind(this));
    this.setState({running: true});
    e.preventDefault();
  }       
    
  changeDesc(e) {
    this.setState({description: e.target.value, spinner: false});
  }    
    
  edit() {
    return (<div>
      <table>
      <form>
      <tr>
      <td>Description:</td>
      <td>
      <input type="text" value={this.state.description} onChange={this.changeDesc.bind(this)} />     
      </td>
      </tr>
      <tr>
      <td colSpan="2">
      <input type="submit" value="Edit" onClick={this.click.bind(this)}/>
      </td>
      </tr>
      </form>
      </table>
      </div>);
  }    
    
  contents() {
    if (this.state.done) {
      return (<div>done</div>);  
    } else if (this.state.running) {
      return (<div>running</div>);
    } else if (this.state.spinner) {
      return (<Spinner />);              
    } else { 
      return this.edit();
    }        
  }
  
  render() {
    return(<div>
      <Breadcrumb routes={this.props.routes} params={this.props.params} />
      <h1>Edit</h1>
      {this.contents()}
      </div>);
  }
}             
           
    this.setState({done: true});
    REST.createRepository(
      {name: this.state.name, description: this.state.description}, 
      this.callback.bind(this));
    this.setState({running: true});
  
  contents() {
    if (this.state.done) {
      return (<div>done</div>);  
    } else if (this.state.running) {
      return (<div>running</div>);
    } else {    
      return (<table border="1">
      <td colSpan="2">
      </table>);
    }      
  }
  
  render() {
    return(
      <div>
      <Breadcrumb routes={this.props.routes} params={this.props.params} />
      <h1>Create</h1>
      {this.contents()}
// todo, rewrite most of this class with diff2html
// see https://github.com/larshp/abapGitServer/issues/21      
class Diff extends React.Component {
  old;
  new;
  
  constructor(props) {
    super(props);

    this.state = {diff: null};
    if (props.old === "") {
      this.old = "";
    } else {
      this.old = null;
      REST.readBlobSHA1(props.old,
                        this.oldd.bind(this));
    }
    if (props.new === "") {
      this.new = "";
    } else {
      this.new = null;
      REST.readBlobSHA1(props.new,
                        this.newd.bind(this));     
    }     
  }
  
  runDiff() {
    if (this.old !== null && this.new !== null) {
      let diff = JsDiff.createTwoFilesPatch(
        this.props.filename, this.props.filename, this.old, this.new);
      
// hack to make diff2html show added and deleted marker      
      if (this.props.old === "") {
        diff = 'diff --git foo bar\n' +
          'new file mode 100644\n' + 
          diff;
      } else if (this.props.new === "") {
        diff = 'diff --git foo bar\n' +
          'deleted file mode 100644\n' + 
          diff;        
      }        

      var diff2htmlUi = new Diff2HtmlUI({diff});   
      diff2htmlUi.draw('#line-by-line'+this.props.fileNumber, {
        inputFormat: 'json',
//        showFiles: true,
        matching: 'lines'
      });      

      this.setState({diff});
    }
  }
  
  oldd(d) {
    this.old = d;
    this.runDiff();
  }
  
  newd(d) {
    this.new = d;
    this.runDiff();
  }
    
  render() {  
    return (<div>
      <div id={"line-by-line"+this.props.fileNumber}><Spinner /></div>
      </div>);
  }
}      
      
  i = 0;
            
 
  single(e) {
    return (<Diff 
      filename={e.FILENAME} 
      fileNumber={this.i++} 
      old={ e.OLD_BLOB } 
      new={ e.NEW_BLOB } />);
  }
  
  diff() {
    return (<div>{this.state.data.FILES.map(this.single.bind(this))}</div>);             
  }
  
    return (
      <div>
      <table>
      <tr>
      <td>Name:</td>
      <td>{this.state.data.COMMITTER.NAME}</td>
      </tr>
      <tr>
      <td>Description:</td>
      <td>{this.state.data.TEXT}</td>
      </tr>
      <tr>
      <td>Parent:</td>
      <td>
      <Link to={this.props.params.repo + "/commit/" + this.state.data.PARENT}>
      {this.state.data.PARENT}</Link>
      </td>
      </tr>
      <tr>
      <td>Time:</td>
      <td>{Time.ago(Time.parse(this.state.data.COMMITTER.TIME))}</td>
      </tr>
      </table>
      <br />
      {this.diff()}
      </div>);
      <td>{Octicons.branch()}</td>
    let clone = window.location.origin + base + "/git/" + this.props.params.repo + ".git";
      
      Clone URL: {clone}<br />
      <br />
        <tr>
        <td>{Octicons.repo()}</td>
        <td><Link to={e.NAME + "/"}>{e.NAME}</Link></td>
        <td>{e.DESCRIPTION}</td>
        <td><Link to={"/edit/" + e.NAME}>{Octicons.pencil()}</Link></td>
        </tr>);
  }          
      
      <table>
      </table>
      <br />
      {Octicons.plus()} <Link to="/create">Create</Link>
      <br />
      <br />
      <a href="/sap/zgit/rest/swagger.html">swagger</a>
      <td>{Octicons.file()}</td>
      {Octicons.commit()} <Link to={list}>list commits</Link><br />
* /create/                          Create          create repository
* /edit/(name)                      Edit            edit repo description
* /(name)/commit/(sha1)             Commit          display commit
          <ReactRouter.Route path="edit/:repo" component={Edit} bread="Edit" />