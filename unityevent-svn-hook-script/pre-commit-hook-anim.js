/// # Author: KeyOnee
/// # Create Date:
/// # Desc: 2018-03-16
/// - SVN에 사용 가능!!!
/// - Unity에서 Animation에 들어있는 event key들을 자동으로 머지해주는 기능
/// - SVN HookScript 기능을 활용하도록 적용.

/* this script is a local pre-commit hook script. */

// # const
var ForReading = 1;
var ForWriting =  2;
var ForAppending = 8;
var RESULT = {
	SUCCESS : 0,
	FAIL : 1
};

// # Global Stubs for Active-X
var SH = WScript.CreateObject("WScript.Shell");
var FSO = WScript.CreateObject("Scripting.FileSystemObject");

// # Variables
var _objArgs, _num;

// # 넘어온 인자 세팅;
_objArgs = WScript.Arguments;
_num = _objArgs.length;
if (_num !== 4)
{
    TerminateWithMessage("Usage: [CScript | WScript] PreCommit.js path/to/pathsfile depth path/to/messagefile path/to/CWD ", RESULT.FAIL);	
}

var _paths = readPaths(_objArgs(0)); // array[]
var _depth = _objArgs(1);
var _messagefile = _objArgs(2);
var _commitLog = GetCommitLogMessage(_messagefile);
var _cwd = _objArgs(3);
var _tempForder = _cwd + '\\tempAnimWork';

var _isDebugHookScript = false;
// # Logic Start -----------------------------
main();

function main(){
	try {

		if(_commitLog.indexOf('debug-hook-script') !== -1) {
			_isDebugHookScript = true;
		}
		
		// # 1. *.anim 파일 들 리스트 추출
		var _animFileList = [];
		for(var i=0; i<_paths.length; i++) {
			var itemPath = _paths[i];
			var ext = GetExtention(itemPath);
			if(ext == 'anim') {
				_animFileList.push(itemPath);
			}
		}		

		if(_animFileList.length == 0) {
            if(_isDebugHookScript) {
                WScript.ECHO('There is no anim file.');
                TerminateWithMessage('debug-hook-script. So Canceled.', RESULT.FAIL);
                return;
            }

			// # 1-1. anim 파일 없으니 신경 끄고 그냥 원래 커밋하듯이 커밋!!
			TerminateWithMessage(null, RESULT.SUCCESS); // <-- SUCCESS;
			return;
		}

		//여기 오면 _animFileList에 작업 할 파일 리스트가 들어 있음.
		
		// # 2. 로그에서 키워드 확인. 
		var overwriteAnim = false;
		if(IsContains(_commitLog, '[OA]') == true) {
			overwriteAnim = true;
		}
		
		// # 3. 작업할 폴더 준비.		
		ExecuteCmd('rmdir /S /Q ' + _tempForder);
		ExecuteCmd('mkdir ' + _tempForder);
		
		// # 4. AnimFile 합치기.
		for(var i=0; i < _animFileList.length; i++){
			MergeAnimFile(_animFileList[i], overwriteAnim);
		}
		
		ExecuteCmd('rmdir /S /Q ' + _tempForder);

		// # 5. Success
		if(_isDebugHookScript) {
			TerminateWithMessage('debug-hook-script. So Canceled.', RESULT.FAIL);
		}
		else {
			TerminateWithMessage(null, RESULT.SUCCESS); // <-- SUCCESS;
		}
	}
	catch(ex) {
		TerminateWithMessage('Exception:' + GetDetailObj(ex), RESULT.FAIL);
	}
}

// # Core Method

function MergeAnimFile(path, overwriteAnim) {
	// # Desc: 이전 버전 받아서 그 버전에 들어있는 m_Events: 의 아랫부분을 다 복사해서 현재 파일의 m_Events: 부분에(없다면 파일 제일 밑에) 추가해 줘야함.
	//
	// # 지금 해당 파일은 이미 작업이 되어 버렸으니 이전 버전을 export 받아서 비교해서 만들어야 함. 
	// - checkout은 폴더 단위로만..., export는 파일단위로도 가능하므로 export로 처리.

    //#region Debug
	if(_isDebugHookScript) {
        WScript.ECHO('MergeAnimFile @ ' + path); // D:/SVN/BBM/Program/script/Attack1.anim
	}
	//#endregion
	
	// # SvnUrl로 변경
	var url = PathToSvnUrl(path);
	
	// # Clear Temp폴더
	ExecuteCmd('del /Q ' + _tempForder + '\\*');
	
	// # Export To Temp폴더
	ExecuteCmd('svn export ' + url + ' ' + _tempForder);
	
	// # GetFileName
	var temp = path.split('/');
	var fullFileName = temp[temp.length -1];	
	
	var oldPath = _tempForder + '\\' + fullFileName;
	
	//// WScript.Echo('oldPath:' + oldPath);
	
	// # export 받은 이전파일의 m_Events: 획득하기.
	var oldFileEventContext = GetEventAreaText(oldPath);

    if(_isDebugHookScript) {
        WScript.ECHO('oldFileEventContext @ ' + oldFileEventContext);
    }
	
	// # 현재 커밋할 파일의 m_Events: 획득하기
	var newFileEventContext = GetEventAreaText(path);

    //#region Debug
    if(_isDebugHookScript) {
        WScript.ECHO('newFileEventContext @ ' + newFileEventContext);
    }
    //#endregion
	
	// # 현재 커밋할 파일의  m_Events: 전까지 획득하기
	var newAnimFileContext = GetAreaTextBeforeEvent(path);
	
	// # 최종 파일 만들기!!
	var finalFileContext = '';
	
	var isNoEvent = IsContains(newFileEventContext, 'm_Events: []');

	//#region Debug
    if(_isDebugHookScript) {
        WScript.ECHO('isNoEvent @ ' + isNoEvent);
    }
    //#endregion
	
	if( isNoEvent && overwriteAnim == false) {
		finalFileContext = newAnimFileContext + oldFileEventContext;

        //#region Debug
        if(_isDebugHookScript) {
            WScript.ECHO('[USE] oldFileEventContext @ ' + oldFileEventContext);
        }
        //#endregion
	}
	else {
		finalFileContext = newAnimFileContext + newFileEventContext;

        //#region Debug
        if(_isDebugHookScript) {
            WScript.ECHO('[USE] newFileEventContext @ ' + newFileEventContext);
        }
        //#endregion
	}
	
	// # 커밋할 파일에 덮어 쓰기.
	if (FSO.FileExists(path))
    {
        var f = FSO.OpenTextFile(path, ForWriting, true/*overwrite*/); // ASCII, Unicode, SystemDefault만 읽기 가능.
		f.Write(finalFileContext);
        f.Close();
    }
}

function GetEventAreaText(filePath) {
	var isFoundEvent = false;
	var textOf_m_Event = '';
    if (FSO.FileExists(filePath))
    {
        var f = FSO.OpenTextFile(filePath, ForReading); // ASCII, Unicode, SystemDefault만 읽기 가능.
        while (!f.AtEndOfStream)
        {
            var strLine = f.ReadLine();
			if(strLine.indexOf('  m_Events:') === 0) {				
				isFoundEvent = true;
			}
			
			if(isFoundEvent) {
				textOf_m_Event = textOf_m_Event + strLine + '\n';
			}
        }
        f.Close();
    }
	
	if(textOf_m_Event == '') {
		textOf_m_Event = '  m_Events: []\n';
	}
	
	return textOf_m_Event;
}

function GetAreaTextBeforeEvent(filePath)
{
	var beforeText = '';
	if (FSO.FileExists(filePath))
    {
        var f = FSO.OpenTextFile(filePath, ForReading); // ASCII, Unicode, SystemDefault만 읽기 가능.
        while (!f.AtEndOfStream)
        {
            var strLine = f.ReadLine();
			if(strLine.indexOf('  m_Events:') === 0) {
				break;
			}
			
			beforeText = beforeText + strLine + '\n';
        }
        f.Close();
    }
	else {
		return;
	}
	
	return beforeText;
}

// # methods ----------------------------------
function readPaths(path)
{
    var retPaths = [];
    if (FSO.FileExists(path))
    {
        var f = FSO.OpenTextFile(path, ForReading); // ASCII, Unicode, SystemDefault만 읽기 가능.
        while (!f.AtEndOfStream)
        {
            var line = f.ReadLine();
            retPaths.push(line);
        }
        f.Close();
    }
    return retPaths;
}

function GetCommitLogMessage(path)
{
	// 커밋 메세지는 UTF-8 형식이므로 FSO.OpenTextFile을 이용할수 없다. 	
	var msgContents = '';
	if (FSO.FileExists(path))
    {
		var objStream = WScript.CreateObject("ADODB.Stream");
		
		objStream.CharSet = "utf-8";
		objStream.Open();
		objStream.LoadFromFile(path);
		
		msgContents = objStream.ReadText();
		
		objStream.Close();
    }
    return msgContents;
}

function TerminateWithMessage(msg, errCode)
{
	if(msg != null) {
		WScript.Echo(msg);
	}
	
	var errCode_SUCCESS = 0;
	if(errCode == undefined || errCode == null || errCode == RESULT.SUCCESS)
	{
		// Do Nothing.
	}
	else
	{
		// Send to stderr for svn error log.		
		try {
			if(msg != null) {
				var stderr = FSO.GetStandardStream (2);
				stderr.WriteLine(msg);
			}
		}
		catch(ex) {
			// stderr is not working.
			// Do Nothing.
			WScript.Echo('stderr not working');
		}
	}
	
	// # Terminate Program.
	WScript.Quit(errCode); // 0: Success, 1~N: Error 
}

function GetExtention(path) {
    if(path == null || path == undefined || typeof(path) !== 'string') {
        return null;
    }

    var extention = '';

    var splitPathArray = path.split('.');
    var count = splitPathArray.length;
    if(count > 1) {
        extention = splitPathArray[count - 1];
    }

    return extention;
}

function GetDetailObj(obj)
{
	var output = '';
	for (var property in obj) {
	  output += property + ': ' + obj[property] + '\n';
	}
	return output;
}

function ExecuteCmd(cmd) {
	var oExec = SH.Exec('cmd /c ' + cmd);
	var strOutput = oExec.stdOut.ReadAll();
	
	return strOutput;
}

function PathToSvnUrl(path) {
	var url = '';	
	
	var strResult = ExecuteCmd('svn info ' + path);
	var strResultArray = strResult.split('\n');
	for(var i=0; i<strResultArray.length; i++) {
		var strLen = strResultArray[i].length;
		if(strResultArray[i].indexOf('URL: ') === 0) {
			url = strResultArray[i].substring(5, strLen-1);
			break;
		}
	}	
	
	return url;
}

function IsContains(str, val) {
	var isContain = false;
	
	if(str.indexOf(val) !== -1) {
		isContain = true;
	}

	return isContain;
}

function CreateFolder(path){
	if(FSO.FolderExists(path)) {
		 FSO.DeleteFolder(path);
	 }
	 FSO.CreateFolder(path);		
}