import csv

file = open('./unigram_freq.csv', 'r') # keep file open for the duration of the program

def get_common_word(letter):

    reader = csv.reader(file)
    next(reader)  # Skip the header row

    top3_words = []

    counter = 0

    for row in reader:
        if counter < 3:
            word = row[0]
            if word.startswith(letter):
                top3_words.append(word)
                counter += 1
    
    return top3_words

# Example usage

response = input("Enter some letters: ")
common_word = get_common_word(response)
print(f"The predictive text starting with '{response}' is: {common_word}")