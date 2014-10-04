<?php
	if(!empty($_GET['sub'])) {
		$json_url = 'http://www.mangaeden.com/api/'.$_GET['sub'];
		$json = file_get_contents($json_url);
		$hasil = json_decode($json);
		$arr = array($hasil);
		echo json_encode($arr);
	}
?>
