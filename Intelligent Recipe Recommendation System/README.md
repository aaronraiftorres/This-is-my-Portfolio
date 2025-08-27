<p align="center">
  <img src="image.jpg" alt="Intelligent Recipe Recommendation System Banner" width="100%" />
</p>

# 🥘 Intelligent Recipe Recommendation System  

A **Streamlit-based web application** that provides personalized recipe recommendations using two powerful approaches:  

---

## ✨ Features  

- 🤖 **AI-Powered Recommendations**: Uses OpenAI GPT-3.5 to generate personalized recipe suggestions based on user preferences  
- 🔍 **Similarity-Based Matching**: Employs TF-IDF vectorization and cosine similarity to find recipes with similar ingredients  
- ⚙️ **User Preference Filtering**: Customizable options for cuisine type, meal type, dietary restrictions, and spiciness level  

---

## 🛠️ How It Works  

1. Users input their food preferences and available ingredients  
2. The system generates recommendations using both **GPT-3.5 API** and **ingredient similarity algorithms**  
3. Results are displayed with clear categorization 🍽️  

---

## 📋 Requirements  

- Python 3.7+  
- Streamlit  
- OpenAI API key  
- pandas  
- scikit-learn  

---

## ⚡ Setup  

1. Install dependencies:  
   ```bash
   pip install streamlit openai pandas scikit-learn
