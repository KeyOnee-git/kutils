// # Global Stubs for Active-X
var SH = WScript.CreateObject("WScript.Shell");
var FSO = WScript.CreateObject("Scripting.FileSystemObject");

function GetCurSVNInfo() {
	var svnInfoObj = {
		Path:'',
		WorkingCopyRootPath:'',
		URL: '',
		Rel_URL: '',
		Repo_Root: '',
		Revision: -1,
		LastRev:-1
	};
	

	var strResult = ExecuteCmd('svn info');		
	var strResultArray = strResult.split('\n');
	
	for(var i=0; i<strResultArray.length; i++) {
		var strLen = strResultArray[i].length;
		if(strResultArray[i].indexOf('Path: ') === 0) {
			svnInfoObj.Path = strResultArray[i].substring(6, strLen-1);
		}
		else if(strResultArray[i].indexOf('Working Copy Root Path: ') === 0) {
			svnInfoObj.WorkingCopyRootPath = strResultArray[i].substring(24, strLen-1);
		}
		else if(strResultArray[i].indexOf('URL: ') === 0) {
			svnInfoObj.URL = strResultArray[i].substring(5, strLen-1);
		}
		else if(strResultArray[i].indexOf('Relative URL: ') === 0) {
			svnInfoObj.Rel_URL = strResultArray[i].substring(14, strLen-1);
		}
		else if(strResultArray[i].indexOf('Repository Root: ') === 0) {
			svnInfoObj.Repo_Root = strResultArray[i].substring(17, strLen-1);
		}
		else if(strResultArray[i].indexOf('Revision: ') === 0) {
			svnInfoObj.Revision = Number(strResultArray[i].substring(10, strLen-1));
		}
		else if(strResultArray[i].indexOf('Last Changed Rev: ') === 0) {
			svnInfoObj.LastRev = Number(strResultArray[i].substring(18, strLen-1));
		}
	}
	
	return svnInfoObj;
}

function GetSVNStatus() {
	var strResult = ExecuteCmd('svn status');		
	var strResultArray = strResult.split('\n');
	
	for(var i=0; i<strResultArray.length; i++) {
		var s = strResultArray[i].split('       '); // '       ' <- 혹시 이 띄어쓰기가 svn 버전마다 틀리지는 않겠지.....?
		if(s.length == 2) {
			//WScript.Echo(s[0] + '@' + s[1]);
		}
	}
	
	return strResultArray;
}

function ExecuteCmd(cmd) {
	var oExec = SH.Exec('cmd /c ' + cmd);
	var strOutput = oExec.stdOut.ReadAll();
	
	return strOutput;
}

function GetDetailObj(obj)
{
	var output = '';
	for (var property in obj) {
	  output += property + ': ' + obj[property] + '\n';
	}
	return output;
}