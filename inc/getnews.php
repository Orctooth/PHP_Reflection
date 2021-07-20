<?php 
    include 'connection.php';
    
    function getRows(){
        try{
            $conn = OpenCon();
            $results = array();
            $i = 0;
            while($i < 3){
                $results[$i] = $conn->query("SELECT * FROM news WHERE id = ($i + 1)");
                $i++;
            }
            
            return $results;
            var_dump($results);
           
        }catch(Exception $e){
            throw $e;
        }
    }

    function separateIntoVars(){
        $data = getRows();
        //var_dump($data);
        $cards=[];
        $i = 0;
        foreach($data as $card){
            $cards[$i]=$card->fetchAll();
            $i++;
        }
        $card= [];
        $card[0] = [
            "title" => $cards[0][0][1],
            "desc" => $cards[0][0][2],
            "img" => $cards[0][0][3],
            "avatar" => $cards[0][0][4],
            "date" => $cards[0][0][5],
            "author" => $cards[0][0][6],
            "tag" => $cards[0][0][7],
            "colour" => $cards[0][0][8]

        ];
        $card[1] = [
            "title" => $cards[1][0][1],
            "desc" => $cards[1][0][2],
            "img" => $cards[1][0][3],
            "avatar" => $cards[1][0][4],
            "date" => $cards[1][0][5],
            "author" => $cards[1][0][6],
            "tag" => $cards[1][0][7],
            "colour" => $cards[1][0][8]

        ];
        $card[2] = [
            "title" => $cards[2][0][1],
            "desc" => $cards[2][0][2],
            "img" => $cards[2][0][3],
            "avatar" => $cards[2][0][4],
            "date" => $cards[2][0][5],
            "author" => $cards[2][0][6],
            "tag" => $cards[2][0][7],
            "colour" => $cards[2][0][8]
        ];
        
        return $card;
       
    }

    
                
?>