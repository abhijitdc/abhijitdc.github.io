export const PROFILE = {
  name: "Abhijit",
  title: "Software Engineer",
  bio: "I am a Software Engineer passionate about building scalable, secure, and intelligent systems. I specialize in cloud technologies, data engineering, and AI integrations, constantly exploring new ways to solve complex problems.",
  links: {
    github: "https://github.com/abhijitdc",
    medium: "https://medium.com/@abhisaxj",
    linkedin: "https://linkedin.com/in/abhijitdc",
    twitter: "https://twitter.com/abhisaxj"
  }
};

export const MEDIUM_POSTS = [
  {
    "title": "Anti-Money Laundering & Fraud Prevention with BigQuery GraphRAG",
    "excerpt": "Learn how to use BigQuery GraphRAG for Anti-Money Laundering and Fraud Prevention.",
    "link": "https://codelabs.developers.google.com/codelabs/graphrag-with-bigquery",
    "tags": [
      "Codelab",
      "BigQuery",
      "GraphRAG"
    ],
    "date": "2024-05-01T00:00:00.000Z",
    "image": "blog/aml.png"
  },
  {
    "title": "Future-Proofing Your Vector Search: Swapping Open Source Models in BigQuery with Zero Friction",
    "excerpt": "In the rapidly evolving landscape of Generative AI, “model lock-in” is a significant risk for data architects. A model that is state-of-the-art tod...",
    "link": "https://medium.com/google-cloud/future-proofing-your-vector-search-swapping-open-source-models-in-bigquery-with-zero-friction-f3a804eb366e?source=rss-7a5a790fd989------2",
    "tags": [
      "Medium",
      "google-cloud-platform",
      "vector-embeddings"
    ],
    "date": "2026-08-10T23:07:31.000Z",
    "image": "blog/vector.png"
  },
  {
    "title": "Build a Gemini Agent Harness from Scratch with Nix-Shell Sandbox",
    "excerpt": "Off-the-shelf frameworks make it easy to build AI agents, but they often abstract away the core execution loop. When an agent gets stuck or thrashe...",
    "link": "https://medium.com/google-cloud/build-a-gemini-agent-harness-from-scratch-with-nix-shell-sandbox-acdd54f9e4af?source=rss-7a5a790fd989------2",
    "tags": [
      "Medium",
      "harness-engineering",
      "google-cloud-platform"
    ],
    "date": "2026-08-10T21:52:24.000Z",
    "image": "blog/gemini.png"
  },
  {
    "title": "Power up your ADK Agent: Building Secure Data Agents with Gemini Enterprise, VertexAI Agent Engine…",
    "excerpt": "How to use end-user credentials to enforce fine-grained data access boundaries in custom agents deployed in Vertex AI Agent Engine with Gemini Ente...",
    "link": "https://medium.com/google-cloud/power-up-your-adk-agent-building-secure-data-agents-with-gemini-enterprise-vertexai-agent-engine-23020870d3fd?source=rss-7a5a790fd989------2",
    "tags": [
      "Medium",
      "gemini-enterprise",
      "google-adk"
    ],
    "date": "2026-02-11T19:43:32.000Z",
    "image": "blog/adk.png"
  },
  {
    "title": "How to use Scala Reflection API to build a data curation framework in Spark",
    "excerpt": "In this blog we will take a look at how we can use Scala Reflect toolbox to build a framwork to inject custom code into a Spark processing pipeline...",
    "link": "https://medium.com/@abhisaxj/how-to-use-scala-reflection-and-toolbox-to-build-a-data-curation-framework-in-spark-363376216ef5?source=rss-7a5a790fd989------2",
    "tags": [
      "Medium",
      "data-curation",
      "spark-scala-tutorial"
    ],
    "date": "2023-06-03T01:33:12.000Z",
    "image": "blog/scala.png"
  }
];

export const GITHUB_REPOS = [
  {
    "name": "bigquery-infoschema-agent",
    "description": "This project implements a conversational AI agent built to interact with and answer questions about Google BigQuery's INFORMATION_SCHEMA. It leverages Google's Agent Development Kit (ADK) and can be configured to use Vertex AI for persistent session management.",
    "link": "https://github.com/abhijitdc/bigquery-infoschema-agent",
    "tags": [
      "Python"
    ],
    "updated_at": "2025-10-14T03:51:45Z",
    "image": "projects/bq_infoschema.png"
  },
  {
    "name": "bq_mcp_agent",
    "description": "A Model Context Protocol (MCP) server integration for Google BigQuery. This agent facilitates seamless AI access to BigQuery resources via standard MCP tool calls.",
    "link": "https://github.com/abhijitdc/bq_mcp_agent",
    "tags": [
      "Python"
    ],
    "updated_at": "2025-12-16T03:42:59Z",
    "image": "projects/bq_mcp.png"
  },
  {
    "name": "gemini_enterprise_adk_sales_agent",
    "description": "An AI-powered sales assistant built using the Google Agent Development Kit (ADK) and Gemini Enterprise. It securely interacts with enterprise data to support advanced sales workflows.",
    "link": "https://github.com/abhijitdc/gemini_enterprise_adk_sales_agent",
    "tags": [
      "Python"
    ],
    "updated_at": "2026-02-08T00:13:23Z",
    "image": "projects/gemini_sales.png"
  },
  {
    "name": "graphrag_with_bigquery",
    "description": "A Jupyter Notebook codelab demonstrating how to implement GraphRAG (Graph Retrieval-Augmented Generation) using Google BigQuery and graph databases for advanced knowledge retrieval.",
    "link": "https://github.com/abhijitdc/graphrag_with_bigquery",
    "tags": [
      "Jupyter Notebook"
    ],
    "updated_at": "2026-06-24T17:30:57Z",
    "image": "projects/graphrag.png"
  },
  {
    "name": "llm-rag-react-app",
    "description": "A full-stack application showcasing a modern architecture with React, Flask, Langchain, and Firebase Auth. It integrates with Vertex AI and Gemini to deliver a secure RAG-powered experience.",
    "link": "https://github.com/abhijitdc/llm-rag-react-app",
    "tags": [
      "TypeScript"
    ],
    "updated_at": "2025-11-21T03:44:16Z",
    "image": "projects/llm_react.png"
  },
  {
    "name": "nixharness",
    "description": "A sandbox environment using Nix-shell designed for building and testing Gemini agent harnesses from scratch. It provides an isolated, reproducible execution loop for advanced AI development.",
    "link": "https://github.com/abhijitdc/nixharness",
    "tags": [
      "Python"
    ],
    "updated_at": "2026-07-29T21:22:12Z",
    "image": "projects/nixharness.png"
  },
  {
    "name": "terraform-bigquery-streaming-demo",
    "description": "Infrastructure as Code (IaC) setup using Terraform to provision BigQuery streaming architectures. It demonstrates best practices for deploying real-time data pipelines on Google Cloud Platform.",
    "link": "https://github.com/abhijitdc/terraform-bigquery-streaming-demo",
    "tags": [
      "HCL"
    ],
    "updated_at": "2025-11-21T03:42:59Z",
    "image": "projects/tf_bq.png"
  },
  {
    "name": "vertexai-rag-app",
    "description": "An implementation of Retrieval-Augmented Generation (RAG) using Google Cloud Vertex AI and Python. It showcases how to integrate foundation models with vector search for enterprise AI applications.",
    "link": "https://github.com/abhijitdc/vertexai-rag-app",
    "tags": [
      "Python"
    ],
    "updated_at": "2025-11-21T03:44:17Z",
    "image": "projects/vertex_rag.png"
  }
];
