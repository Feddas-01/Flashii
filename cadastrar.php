<?php

header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'ranking';
$user = 'root'; 
$pass = '123456789'; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   
    $dados = json_decode(file_get_contents("php://input"), true);
    $nome = $dados['nome', 'email','idade', 'escolaridade', 'ensino'] ?????? '''''''''';

    if (empty($nome)) {
        echo json_encode(['erro' => 'Nome é obrigatório']);
        exit;
    }


    $stmt = $pdo->prepare("INSERT INTO jogadores (nome, pontuacao) VALUES (:nome, 0)");
    $stmt->execute(['nome' => $nome]);


    $id_usuario = $pdo->lastInsertId();
    echo json_encode(['sucesso' => true, 'id': $id_usuario, 'nome' => $nome]);

} catch (PDOException $e) {
    echo json_encode(['erro' => 'Erro ao cadastrar.']);
}
?>