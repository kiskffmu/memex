---
layout: page
title: Teorie
---
<div class="theories">
{% for category in site.data.theories %}
    <h2>{{ category[0] }}</h2>
    
    {% for theory in category[1] %}
    	<h3>{{ theory.name }}</h3>
    	<p>{{ theory.description }}</p>	
    	<p><b>Příklady:</b> {{ theory.examples }}</p>
    {% endfor %}
{% endfor %}
</div>