from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime
import asyncio

load_dotenv()

app = FastAPI(title="SEO Content Gap Analyzer", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class AnalysisRequest(BaseModel):
    domain: str
    region: str = "US"
    language: str = "en"

class ContentGap(BaseModel):
    id: str
    keyword: str
    category: str
    intent: str
    search_volume: int
    difficulty: int
    opportunity_score: float
    current_rank: Optional[int] = None
    competitor_rank: int
    gap_type: str
    evidence: str
    potential_traffic: int

class AnalysisResult(BaseModel):
    analysis_id: str
    domain: str
    total_gaps: int
    high_priority_gaps: int
    estimated_traffic_potential: int
    content_gaps: List[ContentGap]
    created_at: str

# Mock data for SaaS industry
MOCK_CONTENT_GAPS = [
    {
        "id": str(uuid.uuid4()),
        "keyword": "project management software comparison",
        "category": "Product Comparison", 
        "intent": "Commercial Investigation",
        "search_volume": 8900,
        "difficulty": 45,
        "opportunity_score": 8.7,
        "current_rank": None,
        "competitor_rank": 3,
        "gap_type": "Missing Content",
        "evidence": "Competitors rank #3-5 with comparison guides. High commercial intent.",
        "potential_traffic": 2670
    },
    {
        "id": str(uuid.uuid4()),
        "keyword": "agile workflow automation tools",
        "category": "Feature Targeting",
        "intent": "Commercial Investigation", 
        "search_volume": 5600,
        "difficulty": 52,
        "opportunity_score": 7.8,
        "current_rank": 15,
        "competitor_rank": 4,
        "gap_type": "Ranking Gap",
        "evidence": "Currently ranking #15, competitors at #4. Strong feature match.",
        "potential_traffic": 1680
    },
    {
        "id": str(uuid.uuid4()),
        "keyword": "remote team collaboration best practices",
        "category": "Educational Content",
        "intent": "Informational",
        "search_volume": 12400,
        "difficulty": 38,
        "opportunity_score": 9.2,
        "current_rank": None,
        "competitor_rank": 2,
        "gap_type": "Missing Content", 
        "evidence": "High-volume informational keyword. Competitors have comprehensive guides.",
        "potential_traffic": 3720
    },
    {
        "id": str(uuid.uuid4()),
        "keyword": "task management API integration",
        "category": "Technical Content",
        "intent": "Informational",
        "search_volume": 2800,
        "difficulty": 41,
        "opportunity_score": 6.9,
        "current_rank": 8,
        "competitor_rank": 2,
        "gap_type": "Ranking Gap",
        "evidence": "Technical content gap. Developer-focused audience seeking integration guides.",
        "potential_traffic": 840
    },
    {
        "id": str(uuid.uuid4()),
        "keyword": "enterprise project management pricing",
        "category": "Pricing Content",
        "intent": "Commercial Investigation",
        "search_volume": 4200,
        "difficulty": 49,
        "opportunity_score": 8.1,
        "current_rank": None,
        "competitor_rank": 5,
        "gap_type": "Missing Content",
        "evidence": "No dedicated pricing comparison page. High buyer intent keyword.",
        "potential_traffic": 1260
    }
]

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "seo-analyzer"}

@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_content_gaps(request: AnalysisRequest):
    """Analyze content gaps for a domain"""
    
    # Simulate processing time
    await asyncio.sleep(2)
    
    analysis_id = str(uuid.uuid4())
    
    # Sort gaps by opportunity score
    sorted_gaps = sorted(MOCK_CONTENT_GAPS, key=lambda x: x["opportunity_score"], reverse=True)
    
    # Calculate metrics
    total_gaps = len(sorted_gaps)
    high_priority_gaps = len([g for g in sorted_gaps if g["opportunity_score"] >= 8.0])
    estimated_traffic = sum(g["potential_traffic"] for g in sorted_gaps)
    
    return AnalysisResult(
        analysis_id=analysis_id,
        domain=request.domain,
        total_gaps=total_gaps,
        high_priority_gaps=high_priority_gaps,
        estimated_traffic_potential=estimated_traffic,
        content_gaps=sorted_gaps,
        created_at=datetime.now().isoformat()
    )

@app.get("/api/gap/{gap_id}")
async def get_gap_details(gap_id: str):
    """Get detailed information for a specific content gap"""
    
    gap = next((g for g in MOCK_CONTENT_GAPS if g["id"] == gap_id), None)
    if not gap:
        raise HTTPException(status_code=404, detail="Content gap not found")
    
    # Enhanced detail data
    detail_data = {
        **gap,
        "detailed_analysis": {
            "search_trends": "Growing 15% month-over-month",
            "seasonal_patterns": "Consistent year-round with 20% spike in Q1",
            "competition_analysis": "3 main competitors ranking in top 5",
            "content_format_recommendation": "Long-form guide (2000+ words) with interactive elements",
            "target_audience": "Product managers and team leads at 50-500 employee companies",
            "content_angle": "Focus on ROI and productivity metrics",
            "recommended_sections": [
                "Problem identification and cost analysis",
                "Feature comparison matrix", 
                "Implementation best practices",
                "ROI calculation framework",
                "Case studies and success stories"
            ]
        },
        "gap_analysis": {
            "content_quality_gap": "Competitors have more comprehensive coverage",
            "keyword_targeting_gap": "Missing long-tail variations and related terms",
            "user_experience_gap": "Competitors provide better interactive tools",
            "authority_gap": "Lower domain authority and backlink profile"
        },
        "recommended_actions": [
            "Create comprehensive comparison guide with interactive elements",
            "Develop ROI calculator tool",
            "Gather customer case studies and testimonials", 
            "Build targeted landing pages for long-tail variations",
            "Implement schema markup for better SERP features"
        ]
    }
    
    return detail_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)