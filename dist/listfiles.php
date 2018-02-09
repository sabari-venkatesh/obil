<?php
	if (isset($_POST['path'])) {
		$req = $_POST['path'];
		//$req = 'pdf/bse/'; //DEBUG LINE
		$dirlist = getFileList($req);
		//sleep(0.5);
		
		$updateddate = array();
		foreach ($dirlist as $key => $row) {
			$updateddate[$key] = $row['type'];
		}
		array_multisort($updateddate, SORT_NUMERIC, SORT_DESC, $dirlist);
		
		//asort($dirlist);
		echo json_encode($dirlist);
		/*echo "<pre>";
		var_dump($dirlist);
		echo "</pre>";*/
	}
	function getFileList($dir) {
		// array to hold return value
		$retval = array();
		// add trailing slash if missing
		if(substr($dir, -1) != "/") $dir .= "/";
		//echo $dir;
		// open pointer to directory and read list of files
		$d = @dir($dir) or die("getFileList: Failed opening directory $dir for reading");
		while(false !== ($entry = $d->read())) {
		  // skip hidden files
		  if($entry[0] == "." || pathinfo($entry, PATHINFO_EXTENSION) == 'db') continue;
		  if(is_dir("$dir$entry")) {
			$retval[] = array(
			  "name" => basename("$dir$entry"),
			  "path" => "$dir$entry/",
			  "type" => filetype("$dir$entry"),
			  "size" => 0,
			  "lastmod" => filemtime("$dir$entry")
			);
		  } elseif(is_readable("$dir$entry")) {
			$retval[] = array(
			  "name" => basename("$dir$entry"),
			  "path" => "$dir$entry",
			  "type" => pathinfo("$dir$entry", PATHINFO_EXTENSION),
			  "size" => filesize("$dir$entry"),
			  "lastmod" => filemtime("$dir$entry")
			);
		  }
		}
		$d->close();
		return $retval;
	}
	
?>