import time
import openai
import streamlit as st
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Set your OpenAI API key here
openai.api_key = 'sk-proj-G9tQ2P3n6O9Q28y8Le9ET3BlbkFJSSxPFSX3F0pvJnO1OM7e'

# Function to load the dataset
@st.cache
def load_data():
    try:
        df = pd.read_csv('Foods.csv', encoding='ISO-8859-1')
        return df
    except Exception as e:
        st.error(f"Error loading data: {e}")
        return None

# Function to recommend recipes based on user input using OpenAI's GPT-3.5 API
def recommend_recipes_gpt(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            n=3,
            stop=None,
            temperature=0.7
        )
        recipes = [choice['message']['content'].strip() for choice in response['choices']]
        return recipes
    except openai.error.RateLimitError:
        st.error("Rate limit exceeded. Please try again later.")
        return []
    except Exception as e:
        st.error(f"Error generating recommendations: {e}")
        return []

# Function to recommend recipes based on ingredients similarity using TF-IDF vectorization
def recommend_recipes_similarity(ingredients, df, n=3):
    try:
        if 'Ingredients' not in df.columns or 'Foods' not in df.columns:
            st.error("The dataset does not contain the required columns 'Ingredients' and 'Foods'.")
            return []

        # Preprocess ingredients
        ingredients = ingredients.lower().split(',')

        # Preprocess and tokenize recipe ingredients
        df['ingredients_combined'] = df['Ingredients'].fillna('').apply(lambda x: ' '.join(map(str, x.split(',')))).str.lower()
        df['tokenized_ingredients'] = df['ingredients_combined'].apply(lambda x: x.split(','))

        # TF-IDF vectorization
        vectorizer = TfidfVectorizer(tokenizer=lambda x: x, lowercase=False)
        vectors = vectorizer.fit_transform(df['tokenized_ingredients'].tolist() + [ingredients])

        # Cosine similarity calculation
        similarity_scores = cosine_similarity(vectors[-1], vectors[:-1]).flatten()
        similar_indices = similarity_scores.argsort()[-n:][::-1]

        recommendations = df.iloc[similar_indices]['Foods'].tolist()
        return recommendations
    except Exception as e:
        st.error(f"Error generating similarity-based recommendations: {e}")
        return []

# Main Streamlit app
def main():
    st.title('Intelligent Recipe Recommendation System')
    df = load_data()

    if df is not None:
        st.sidebar.title('How to Use')
        st.sidebar.markdown('1. Answer the series of prompts to help us understand your preferences.')
        st.sidebar.markdown('2. Enter the ingredients you have in the textbox.')
        st.sidebar.markdown('3. Click the "Get Recommendations" button to see recipe suggestions based on your preferences and ingredients.')
        st.sidebar.markdown('4. Review the recipe suggestions provided.')
        st.header('Tell us about your preferences')
        cuisine = st.selectbox('What type of cuisine do you prefer?', ['Any', 'Italian', 'Chinese', 'Indian', 'Mexican', 'Other'])
        meal_type = st.selectbox('What type of meal are you looking for?', ['Any', 'Breakfast', 'Lunch', 'Dinner', 'Snack'])
        dietary_restrictions = st.multiselect('Do you have any dietary restrictions?', ['None', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'])
        spiciness = st.selectbox('How spicy do you like your food?', ['Any', 'Mild', 'Medium', 'Hot'])
        ingredients = st.text_input('Enter ingredients (comma-separated):')

        if st.button('Get Recommendations'):
            if ingredients:
                user_preferences = f"""
                Cuisine: {cuisine}
                Meal Type: {meal_type}
                Dietary Restrictions: {', '.join(dietary_restrictions) if dietary_restrictions else 'None'}
                Spiciness: {spiciness}
                Ingredients: {ingredients}
                """
                gpt_recipes = recommend_recipes_gpt(user_preferences)
                similarity_recipes = recommend_recipes_similarity(ingredients, df)
                st.subheader('GPT-3.5 Recommendations')
                for i, recipe in enumerate(gpt_recipes, start=1):
                    st.write(f'{i}. {recipe}')
                st.subheader('Similarity-Based Recommendations')
                if similarity_recipes:
                    for i, recipe in enumerate(similarity_recipes, start=1):
                        st.write(f'{i}. {recipe}')
                else:
                    st.write("No similarity-based recommendations found.")
            else:
                st.error('Please enter some ingredients.')

if __name__ == '__main__':
    main()
