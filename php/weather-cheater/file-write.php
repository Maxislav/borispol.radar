<?php

/**
 * Created by PhpStorm.
 * User: mars
 * Date: 5/12/16
 * Time: 12:51 PM
 */
class FileWrite
{
    private $arrRequestMethod = null;

    function __construct($arr) {
        $this->arrRequestMethod = $arr;
    }

    public function write(){
        $arrRequestMethod = $this->arrRequestMethod;
        $date = new DateTime();
        $date->setTimezone(new DateTimeZone('Europe/Kiev'));
        $dateStr = $date->format('Y-m-d');
        $fileName = 'log/' . $dateStr . '.txt';
        if (file_exists($fileName)) {
            // echo "exist";
        } else {
            $file = fopen($fileName, 'w') or die('Could not create report file: ' . $fileName);
            chmod($fileName, 0777);
            fclose($file);
        }
        $file = fopen($fileName, 'a') or die('Could not create report file: ' . $fileName);
        $time = "\r\n" . "<div class='line'><h4 style='margin: 5px 2px 2px 2px;'>" . $date->format('H:i:s') . "</h4>";
        fwrite($file, $time);
        if ($arrRequestMethod) {
            $kv = array();
            $prefix = "\r\n<div style='margin: 2px; color: #ff6600'>";
            $reportLine = $prefix;
            foreach ($arrRequestMethod as $key => $value) {
                $str = $value;
                $order = array("\r\n", "\n", "\r");
                $replace = '<br />';
                $newstr = str_replace($order, $replace, $str);

                $kv[] = "$key=$value";
                ///echo "$key=$value";
                $reportLine = $reportLine . "  " . "$key" . ":" . "$newstr";
                //$reportLine = $reportLine.$newstr;

                // echo "$key=$value";
            }
            $suffix = "</div>";
            $reportLine = $reportLine . $suffix;
            fwrite($file, $reportLine);

        }
        fwrite($file, "\r\n</div>");
        fclose($file);
    }
}