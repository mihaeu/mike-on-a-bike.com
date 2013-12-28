#!/usr/bin/env php
<?php

if (!file_exists(__DIR__.'/vendor/autoload.php')) {
	echo "\n"
	 ."[ERROR] odin depends on some external libraries and components.\n"
	 ."It seems that those dependencies aren't properly installed.\n\n"
	 ."Perhaps you forgot to execute 'php composer.phar install' before\n"
	 ."using odin for the first time?\n\n"
	 ."This command requires that you have previously installed Composer.\n"
	 ."To do so, execute the following command:\n\n"
	 ." $ curl -s http://getcomposer.org/installer | php"
	 ."\n\n";
	exit(1);
}
require __DIR__.'/vendor/autoload.php';

require __DIR__.'/vendor/odin/odin/bin/odin.php';
