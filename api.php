<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$dbname = 'ranking';
$user = 'root'; 
$pass = '123456789';  

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   
    $stmt = $pdo->query("SELECT nome, pontuacao from jogadores ORDER BY    pontuacao desc limit 10");
    $ranking = $stmt->fetchAll(PDO::FETCH_ASSOC);


    echo json_encode($ranking);

} catch (PDOException $e) {
    echo json_encode(['erro' => 'Falha na conexão com o banco de dados.']);
}
?>