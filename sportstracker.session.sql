CREATE TABLE sports_results (
    sport_id INT AUTO_INCREMENT PRIMARY KEY,
    sport_name VARCHAR(100) NOT NULL,
    sport_level VARCHAR(50) NOT NULL,
    sport_category VARCHAR(50) NOT NULL,
    sport_gender VARCHAR(20) NOT NULL,
    home_division VARCHAR(100) NOT NULL,
    against_division VARCHAR(100) NOT NULL,
    home_result INT NOT NULL,
    against_result INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


select * from sports_results;