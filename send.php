<?php
if ($_POST) {
	$name = "MiMi'17";
	$email = "altair08111994@yandex.ru";
	$subject = "Анкета конкурсантки";
	$message = "1. Ф.И.О ".htmlspecialchars($_POST["name"]);
	$message .= "\n".htmlspecialchars($_POST["phone"]);
	$message .= "\n2. Контактный телефон ".htmlspecialchars($_POST["phone"]);
	$message .= "\nEmail ".htmlspecialchars($_POST["mail"]);
	$message .= "\nVk.com\id ".htmlspecialchars($_POST["vk"]);
	$message .= "\n3. Дата рождения ".htmlspecialchars($_POST["birthday"]);
	$message .= "\n3. Дата рождения ".htmlspecialchars($_POST["location"]);
	$message .= "\n4. Факультет, группа ".htmlspecialchars($_POST["faculty"]);
	$message .= "\n5. О себе (талант, черты характера, увлечения, мечты, идеи и.т.д) ".htmlspecialchars($_POST["about"]);
	$message .= "\n6. Занимаетесь ли вы спортом? Если да, то каким? ".htmlspecialchars($_POST["sport"]);
	$message .= "\n7. Какими своими достижениями Вы гордитесь? ".htmlspecialchars($_POST["achivements"]);
	$message .= "\n8. От чего Вам сложно отказатсья? ".htmlspecialchars($_POST["habbits"]);
	$message .= "\n9. Ваши планы на этот год ".htmlspecialchars($_POST["plans"]);
	$message .= "\n10. Чего Вы ожидаете от конкурса? ".htmlspecialchars($_POST["expections"]);
	$message .= "\n11. Откуда вы узнали о кастинге? ".htmlspecialchars($_POST["know"]);
	$message .= "\n12. Почему именно вы должны стать участницей конкурса красоты и талантов Мисс МИЭТ'17? ".htmlspecialchars($_POST["miss"]);
	$json = array();

	function mime_header_encode($str, $data_charset, $send_charset) {
		if($data_charset != $send_charset)
		$str=iconv($data_charset,$send_charset.'//IGNORE',$str);
		return ('=?'.$send_charset.'?B?'.base64_encode($str).'?=');
	}
	class TEmail {
	public $from_email;
	public $from_name;
	public $to_email;
	public $to_name;
	public $subject;
	public $data_charset='UTF-8';
	public $send_charset='windows-1251';
	public $body='';
	public $type='text/plain';

	function send(){
		$dc=$this->data_charset;
		$sc=$this->send_charset;
		$enc_to=mime_header_encode($this->to_name,$dc,$sc).' <'.$this->to_email.'>';
		$enc_subject=mime_header_encode($this->subject,$dc,$sc);
		$enc_from=mime_header_encode($this->from_name,$dc,$sc).' <'.$this->from_email.'>';
		$enc_body=$dc==$sc?$this->body:iconv($dc,$sc.'//IGNORE',$this->body);
		$headers='';
		$headers.="Mime-Version: 1.0\r\n";
		$headers.="Content-type: ".$this->type."; charset=".$sc."\r\n";
		$headers.="From: ".$enc_from."\r\n";
		return mail($enc_to,$enc_subject,$enc_body,$headers);
	}

	}

	$emailgo= new TEmail;
	$emailgo->from_email= "MiMi'17";
	$emailgo->from_name= "MiMi'17";
	$emailgo->to_email= $email;
	$emailgo->to_name= $name;
	$emailgo->subject= $subject;
	$emailgo->body= $message;
	$emailgo->send();

	$json['error'] = 0;

	echo json_encode($json);
} else {
	echo 'GET LOST!';
}
?>
